import dotenv from 'dotenv';
import { Track } from './src/track.js';
import waypoints from './sample.js';

dotenv.config();

const main = async () => {
  let t = new Track(waypoints);
  
  console.log(`Track temperature : ${await t.getTemperature()}°C`);
  console.log(`Track total duration : ${t.getTotalDuration()}ms`);
  console.log(`Track total distance : ${t.getDistance()}m`);
  console.log(`Track active duration : ${t.getActiveDuration(10000, 5)}`);
}

main();