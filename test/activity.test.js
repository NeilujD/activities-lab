/* eslint-disable no-undef */
import assert from 'assert';

import { Activity, Marathon } from '../src/activity.js';
import { Track } from '../src/track.js';

import sample from '../sample.js';

describe("Activity", () => {
  describe("constructor", () => {
    it("should require the `type` argument", done => {
      try {
        new Activity();
      } catch (e) {
        assert.equal(e, "missing_type_argument");
      }

      done();
    });

    it("should require the `track` argument", done => {
      console.log(Activity.getSportTypes());
      try {
        new Activity(Activity.getSportTypes().RUNNING);
      } catch (e) {
        assert.equal(e, "missing_track_argument");
      }

      done();
    });

    it("should require the `track` argument", done => {
      try {
        const track = new Track(sample);
        new Activity("_test_", track);
      } catch (e) {
        assert.equal(e, "bad_type_argument");
      }

      done();
    });

    it("should have the `type` property and the `track` property once being instantiated", done => {
      const track = new Track(sample);
      const type = Activity.getSportTypes().RUNNING;
      const a = new Activity(type, track);
      assert.equal(a.type, type);
      assert.equal(a.track, track);

      done();
    });
  });

  describe("setDistanceFromTrack", () => {
    it("should update the `distance` property", done => {
      const track = new Track(sample);
      const type = Activity.getSportTypes().RUNNING;
      const activity = new Activity(type, track);
      activity.setDistanceFromTrack();
      assert.equal(activity.distance, track.getDistance());

      done();
    });
  });

  describe("setDistanceFromTrack", () => {
    it("should update the `duration` property", done => {
      const track = new Track(sample);
      const type = Activity.getSportTypes().RUNNING;
      const activity = new Activity(type, track);
      activity.setDurationFromTrack();
      assert.equal(activity.duration, track.getTotalDuration());

      done();
    });
  });

  describe("isValid", () => {
    it("should return true if the instance is valid", done => {
      const track = new Track(sample);
      const type = Activity.getSportTypes().RUNNING;
      const activity = new Activity(type, track);
      activity.setDistanceFromTrack();
      activity.setDurationFromTrack();
      assert.equal(activity.isValid(), false);
      activity.type = Activity.getSportTypes().WALKING;
      assert.equal(activity.isValid(), true);

      done();
    });
  });
});

describe("Marathon", () => {
  describe("constructor", () => {
    it("should have the `type` property equal to `running`", done => {
      const track = new Track(sample);
      const marathon = new Marathon(track);
      assert.equal(marathon.type, Activity.getSportTypes().RUNNING);

      done();
    });
  });
});