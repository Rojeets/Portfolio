# Building an AI Referee: Computer Vision for Football Player Detection and Tracking

*How I built a system that detects, tracks, and analyzes football players from broadcast video — and serves it all through an interactive dashboard.*

---

Football analytics is booming. From expected goals models to pressing triggers, clubs are hungry for data. But most existing solutions are either expensive (Opta, StatsBomb) or limited in scope. What if you could build your own player tracking system from a single broadcast video?

I set out to do exactly that: a computer vision pipeline that detects football players, tracks them across frames, identifies their teams, maps their positions onto a 2D pitch, detects collisions, and visualizes everything through a real-time web dashboard. Here's how it works.

## The Pipeline at a Glance

```
Video Frame → YOLOv5 Detection → SORT Tracking → Team Classification → Pitch Mapping → CSV Export → Flask Dashboard
```

Each stage chains into the next. Let's walk through them.

## Step 1: Player Detection with YOLOv5

The system uses two YOLOv5 models loaded via PyTorch Hub:

- **`yolov5s`** — The standard small COCO-pretrained model for detecting persons (class 0)
- **`goals.pt`** — A custom fine-tuned model for detecting goal posts

```python
goal_model = torch.hub.load('../yolov5', 'custom', path='../models/goals.pt', source='local')
player_model = torch.hub.load('../yolov5', 'custom', path='../models/yolov5s.pt', source='local')
```

On each frame, both models run inference. The player model returns bounding boxes, which we filter to class 0 (person):

```python
for result in results:
    if result['class'] == 0:
        x1, y1 = int(result['xmin']), int(result['ymin'])
        x2, y2 = int(result['xmax']), int(result['ymax'])
        boxes.append(((x1, y1), (x2, y2)))
```

## Step 2: Tracking with SORT

Raw detections are frame-by-frame — they don't tell you which detections belong to the same player. Enter **SORT** (Simple Online and Realtime Tracking), a Kalman-filter-based tracker that assigns persistent IDs.

```python
detections = []
for (x1, y1), (x2, y2) in boxes:
    detections.append([x1, y1, x2, y2, 1.0])

tracker = Sort()
tracked_objects = tracker.update(np.array(detections))
```

SORT handles:
- **ID assignment** via Hungarian algorithm on IoU (Intersection over Union)
- **Motion prediction** via Kalman filter (constant velocity model)
- **Birth/death** of tracks (players entering/leaving frame)

The output is a list of `[x1, y1, x2, y2, id]` for each tracked player.

## Step 3: Team Classification with SSIM

To distinguish teams (and the referee), I use **SSIM — Structural Similarity Index** — to compare cropped jersey regions against reference template images.

```python
for team, template in jersey_templates.items():
    score, _ = ssim(resized_gray, template_gray, full=True)
    if score > max_score:
        max_score = score
        best_match = team
```

The process:
1. Crop the upper 50% of each player bounding box (where the jersey is)
2. Resize to 40×40 pixels
3. Convert to grayscale
4. Compare against pre-loaded template images (`jersyredwhite.png`, `jersyblue.png`, `refreee.png`, etc.) using SSIM
5. Assign the team with the highest similarity score

It's simple but effective. SSIM captures luminance, contrast, and structure — more robust than raw pixel comparison or simple color histogram matching.

## Step 4: Pitch Line Detection

To map players onto a tactical view, we need to understand the camera perspective. The system detects pitch lines through a multi-step computer vision pipeline:

1. **HSV masking** — Isolate green pixels (the pitch) using a tuned range (`[40, 40, 40]` to `[70, 255, 255]`)
2. **Canny edge detection** on the masked region
3. **Hough Transform** to extract lines from edges
4. **Line clipping** — Clip infinite lines to frame boundaries
5. **Green region analysis** — Score remaining lines by how much "non-green" area they separate (pitch lines should separate green pitch from non-green stands/boards)

```python
hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
lower_green = np.array([40, 40, 40])
upper_green = np.array([70, 255, 255])
bitwise = cv2.bitwise_and(image, image, mask=cv2.inRange(hsv, lower_green, upper_green))
edges = cv2.Canny(bitwise, 100, 200)
lines = cv2.HoughLines(edges, 1, np.pi * 1 / 180, 150)
```

The best two lines are classified as "left" or "right" touchlines based on their angle — this tells us which side of the pitch the camera is pointing at.

## Step 5: Perspective Transform to Pitch Coordinates

This is the most interesting part. We need to convert pixel coordinates `(x, y)` in the video frame to normalized pitch coordinates `(0–1, 0–1)`.

The approach uses a **pinhole camera model** with estimated field of view:

```python
# Estimate FOV from average player bounding box size
fov_h = 21 / avg_player_width     # WIDTH_CONST / avg_width
fov_v = 24 / avg_player_height    # HEIGHT_CONST / avg_height
scaled = 2 * tan(fov / 2)         # Scale to pinhole distance 1
```

Once pixel positions are scaled to the pinhole image plane, we compute:

1. **The pitch corner** — Intersection of the two detected pitch lines
2. **Rotation matrices** — Rotate around X and Y axes to align the camera view with the pitch plane
3. **Ray-plane intersection** — Project a ray from the pinhole through the scaled pixel position onto the pitch plane (XZ at a fixed Y)

```python
R = matmul(Rx, Ry)
pinhole = [50 - 100*lft, -7, -70]   # Estimated camera position
vec = R.dot(pinhole)                 # Rotated view direction
t = pinhole[1] / vec[1]
point = [pinhole[0] - t*vec[0], pinhole[1] - t*vec[1], pinhole[2] - t*vec[2]]
```

The result is normalized: `((x + 52) / 104, (z + 32) / 64)` — giving pitch coordinates in the `[0, 1]` range.

## Step 6: Collision Detection

With position data logged per frame, collision detection is straightforward: any two players whose pitch coordinates are within **1.5 units** get flagged. The system tracks collision duration and saves events to a separate CSV.

```python
dx = p1['X (Pitch)'] - p2['X (Pitch)']
dy = p1['Y (Pitch)'] - p2['Y (Pitch)']
dist = math.hypot(dx, dy)

if dist <= 1.5:
    active_pairs.add(key)
    # Track start_time, duration, position
```

## Step 7: The AI Referee Dashboard

The final output is a **Flask-based web dashboard** styled as a "VAR Command Center" — dark theme, tactical pitch, live stats.

```
app.py → reads output/player_positions.csv → renders index.html
```

The dashboard features:

- **Live match feed** — Embedded YouTube video (placeholder for now)
- **Tactical pitch map** — CSS-drawn football pitch with positioned player dots (team A in blue, team B in red)
- **Game clock** — Running timer starting at 48:00 (second half)
- **Event log** — Scrollable list of match events
- **AI alerts panel** — Critical alerts (e.g., red card detection) with VAR review buttons
- **Player detail popups** — Click a player dot on the pitch to see their photo, name, team, and stats
- **Live polls** — Fan voting UI showing percentage bars
- **Match statistics** — Possession, shots, tackles, etc. with animated bar comparisons

The CSS pitch is drawn entirely with CSS — penalty areas, center circle, goals, corner arcs — all using `border-radius`, `aspect-ratio`, and absolute positioning.

## What's Next

This is a prototype. Some obvious next steps:

- **Ball tracking** — The goal model detects goals, and there's a "ball" jersey template, but ball tracking isn't fully integrated
- **Re-identification** — SSIM works but could be replaced with a learned embedding (e.g., ReID models) for better accuracy across different camera angles
- **Multiple camera fusion** — Combine feeds from multiple broadcast angles for 3D position reconstruction
- **Event detection** — Beyond collisions: detect goals, corners, offsides from position data
- **Live streaming** — Connect to live video feeds instead of pre-recorded clips
- **Proper calibration** — Replace FOV estimation constants with actual camera calibration

## Try It Yourself

The full source is available. Here's what you need:

```bash
# Clone YOLOv5
git clone https://github.com/ultralytics/yolov5 ../yolov5

# Install dependencies
pip install torch opencv-python numpy pandas flask scikit-image sort-track

# Run the pipeline
cd tests && python main.py

# Start the dashboard
cd .. && python app.py
```

You'll need your own video files, jersey template images, and model weights (`goals.pt`, `yolov5s.pt`).

---

From broadcast video to tactical pitch map in one pipeline — it's amazing what's possible with open-source computer vision tools and a bit of linear algebra. Whether you're building analytics for a club, a coaching tool, or just exploring sports tech, the building blocks are more accessible than ever.
