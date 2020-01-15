# Description
Small lib that permit to compute data from tracking activities data.

# Requirements
1. Node version should be >=12

2. Installation
(The package is not published yet, if you wish to use it you have to clone the repository)
```bash
npm i -s activities-lab
```

# How to use
```node
import { Track, Activity, Marathon } from 'activities-lab';
import waypoints from 'activities-lab/sample.js';

const track = new Track(waypoints);
const activity = new Activity(Activity.getSportTypes().WALKING, track);

console.log(activity.isValid());
```