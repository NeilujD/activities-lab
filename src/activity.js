const SPORT_TYPES = {
  "RUNNING": "running",
  "CYCLING": "cycling",
  "WALKING": "walking"
}

const MARATHON_DISTANCE = 42.195;
const MARATHON_DURATION = 15;

/** 
 * The class constructor initilize tha activity the a given track and activity type.
 * @class
 * @classdesc The activity class permit to track an activity
 */
class Activity {
  /** 
   * Create an activity
   * @param {string} type - The activity type
   * @param {Track} track - A track instance
   */
  constructor (type, track) {
    if (typeof type == "undefined") throw "missing_type_argument";
    if (Object.values(Activity.getSportTypes()).indexOf(type) == -1) throw "bad_type_argument";
    if (typeof track == "undefined") throw "missing_track_argument";

    this.type = type;
    this.track = track;
  }

  /** 
   * Return the available sport types
   * @static
   * @returns {Array}
   */
  static getSportTypes () {
    return SPORT_TYPES;
  }

  /** 
   * Determinate if the activity is valid or not
   * @returns {boolean}
   */
  isValid () {
    if (this.distance < 0) return false;

    switch (this.type) {
      case SPORT_TYPES.RUNNING:
        return this._getSpeed() > 18;
      case SPORT_TYPES.CYCLING:
        return this._getSpeed() > 50;
      case SPORT_TYPES.WALKING:
        return this._getSpeed() > 7;
    }
  }

  /** 
   * Update the distance property
   * @param {number} [defaultDistance=null]
   */
  setDistanceFromTrack (defaultDistance=null) {
    this.distance = defaultDistance || this.track.getDistance();
  }

  /** 
   * Update the duration property
   * @param {number} [defaultDuration=null]
   */
  setDurationFromTrack (defaultDuration=null) {
    this.duration = defaultDuration || this.track.getTotalDuration();
  }

  /** 
   * Return the activity average speed
   * @private
   * @returns {number}
   */
  _getSpeed () {
    return (this.distance / 1000) / (this.duration / 1000 / 60 / 60);
  }
}

/** 
 * The class constructor inherit from the Activity class
 * @class
 * @classdesc Initialize the marathon activity with track and default values.
 */
// eslint-disable-next-line no-unused-vars
class Marathon extends Activity {
  /** 
   * Create a marathon
   * @param {Track} track 
   */
  constructor (track) {
    super(SPORT_TYPES.RUNNING, track);
    
    this.setDistanceFromTrack(MARATHON_DISTANCE);
    this.setDurationFromTrack(MARATHON_DURATION);
  }
}

export { Activity, Marathon };