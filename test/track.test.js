/* eslint-disable no-undef */
import assert from 'assert';

import { Track } from '../src/track.js';
import sample from '../sample.js';

describe("Track", () => {
  describe("contructor", () => {
    it("should require the `waypoints` argument", done => {
      try {
        new Track();
      } catch (e) {
        assert.equal(e, "missing_waypoints_argument");
      }
      
      done();
    });
  
    it("should require the `waypoints` argument not to be empty", done => {
      try {
        new Track(new Array());
      } catch (e) {
        assert.equal(e, "waypoints_should_not_be_empty");
      }
      
      done();
    });
  
    it("should have the property `waypoints` after being instantiated", done => {
      const t = new Track(sample);
      assert.equal(t.waypoints, sample);
      
      done();
    });
  });

  describe("getDistance", () => {
    it("should return a number >= 0", done => {
      const t = new Track(sample);
      const distance = t.getDistance();
      assert.equal(distance, 2630.7692832709968);

      done();
    });
  });

  describe("getTotalDuration", () => {
    it("should return a number >= 0", done => {
      const t = new Track(sample);
      const duration = t.getTotalDuration();
      assert.equal(duration, 948000);

      done();
    });
  });

  describe("getActiveDuration", () => {
    it("should require the `duration` argument", done => {
      const t = new Track(sample);
      try {
        t.getActiveDuration(undefined, 1);
      } catch (e) {
        assert.equal(e, "missing_duration_argument");
      }

      done();
    });

    it("should require the `limit` argument", done => {
      const t = new Track(sample);
      try {
        t.getActiveDuration(1);
      } catch (e) {
        assert.equal(e, "missing_limit_argument");
      }

      done();
    });

    it("should return number >= 0", done => {
      const t = new Track(sample);
      const duration = t.getActiveDuration(10000, 5);
      assert.equal(duration, 511000);

      done();
    });
  });

  describe("getTemperature", () => {
    it("should return the right temperature", async () => {
      const t = new Track(sample);
      const temperature = await t.getTemperature();
      assert.equal(temperature, -66.55);
    });
  });
});