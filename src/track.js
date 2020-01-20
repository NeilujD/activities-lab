import https from 'https';
import { DARK_SKY_API } from '../settings.js';

/** The class constructor initialize the instance with a list of GPS points with time
 * @class
 * @classdesc The Track class permit to compute data based on given points list
 */
class Track {
  /** Create a track 
   * @param {Array} waypoints - The points list
   */
  constructor (waypoints) {
    if (typeof waypoints == "undefined") {
      throw "missing_waypoints_argument";
    }
    else if (waypoints.length === 0) {
      throw "waypoints_should_not_be_empty";
    }

    this.waypoints = waypoints;
  }

  /** Return distance in meters based on `waypoints` property. 
   * @returns {number}
   */
  getDistance () {
    let distance = 0;

    for (var i = 0; i < this.waypoints.length - 1; i++) {
      distance += this._getDistanceBetweenPoints(this.waypoints[i], this.waypoints[i + 1]);
    }

    return distance;
  }

  /** Return duration based on `waypoints` property. 
   * @returns {number}
   */
  getTotalDuration () {
    let firstPoint = this.waypoints[0], lastPoint = this.waypoints[this.waypoints.length - 1];
    return lastPoint.time - firstPoint.time;
  }

  /** Return the active duration
   * @param {number} duration - The maximum inactive duration
   * @param {number} limit - The minimum active speed limit
   * @returns {number}
   */
  getActiveDuration (duration, limit) {
    if (typeof duration == "undefined") throw "missing_duration_argument";
    if (typeof limit == "undefined") throw "missing_limit_argument";
    
    let activeDuration = this.getTotalDuration();
    let notActiveDuration = 0;
    let speed;

    for (var i = 0; i < this.waypoints.length - 1; i++) {
      speed = this._getSpeedBetweenPoints(this.waypoints[i], this.waypoints[i + 1]);

      if (speed < limit) {
        notActiveDuration += this.waypoints[i + 1].time - this.waypoints[i].time;
        if (i != this.waypoints.length - 2) continue;
      }
      
      if (notActiveDuration >= duration) {
        activeDuration -= notActiveDuration;
      }

      notActiveDuration = 0;
    }

    return activeDuration;
  }

  /** Retrieve temperature from API DarkSky and update the temperature property
   * @returns {Promise} Promise object that represent the temperature
   */
  getTemperature () {
    const firstPoint = this.waypoints[0];
    return new Promise ((res, rej) => {
      https.get(`${DARK_SKY_API.uri}/${process.env.DARK_SKY_API_KEY}/${firstPoint.lat},${firstPoint.lon},${firstPoint.time/1000}`, response => {
        let body = "";
        response.on("data", d => {
          body += d;
        });
        response.on("end", () => {
          const data = JSON.parse(body).hourly.data;

          for (var i = 0; i < data.length; i++) {
            if (firstPoint.time / 1000 > data[i].time) continue;
            this.temperature = data[i].temperature;
            break;
          }
  
          res(this.temperature);
        });
      }).on("error", error => {
        rej(error);
      });
    });
  }

  /** Calculate speed between two given points
   * @private
   * @param {Object} point0 
   * @param {Object} point1 
   * @returns {number}
   */
  _getSpeedBetweenPoints (point0, point1) {
    const distance = this._getDistanceBetweenPoints(point0, point1);
    const duration = point1.time - point0.time;

    return (distance / 1000) / (duration / 1000 / 60 / 60);
  }

  /** Calculate distance between two points
   * @private
   * @param {Object} point0
   * @param {Object} point1
   * @returns {number}
   */
  _getDistanceBetweenPoints (point0, point1) {
    const earthRadius = 6378137;

    let rlon0 = point0.lon * (Math.PI / 180);
    let rlat0 = point0.lat * (Math.PI / 180);
    let rlon1 = point1.lon * (Math.PI / 180);
    let rlat1 = point1.lat * (Math.PI / 180);

    let dlon = (rlon1 - rlon0) / 2;
    let dlat = (rlat1 - rlat0) / 2;

    let a = (Math.sin(dlat) * Math.sin(dlat)) + Math.cos(rlat0) * Math.cos(rlat1) * (Math.sin(dlon) * Math.sin(dlon));
    let distance = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (earthRadius * distance);
  }
}

export { Track };