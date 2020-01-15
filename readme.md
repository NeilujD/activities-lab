# Description
Small lib that permit to compute data from tracking activities data.

# Requirements
1. Node version should be >=12

2. A (Dark Sky)[https://darksky.net/dev] API key

2. Installation
```bash
npm i @neilujd/activities-lab
```

# How to use
1. Set the environment variable `DARK_SKY_API_KEY`

2. Here is an example :
```node
import { Track, Activity, Marathon } from 'activities-lab';
import waypoints from 'activities-lab/sample.js';

const track = new Track(waypoints);
const activity = new Activity(Activity.getSportTypes().WALKING, track);

console.log(activity.isValid());
```