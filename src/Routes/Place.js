const Place = require('../Models/Place');
const controller = require('../Controllers/Place');
const controllerGeneric = require('../Controllers/Generic');

const Lecture = require('../Models/Lecture');
const Speaker = require('../Models/Speaker');



module.exports = (router) => {
    router.route('/places/')

        // Gets list of places.
        .get(controller.getAll)

        // Creates a new place
        .post(controller.create);

    router.route('/places/:id/')

        // Gets a place by id.
        .get(controller.getOne)

        // Updates a place.
        .put(controller.update)

        // Deletes a place.
        .delete(controller.delete);

    router.route('/places/:id/lectures/')

        // Gets all lectures in place.
        .get(controller.getLectures)

        // Creates new lecture and attaches to a place;
        .post(controller.createLecture);

    router.route('/places/:placeId/lectures/:lectureId/')

        // Gets lecture by id in some place.
        .get(controller.getLecture)

        // Attach lecture to place.
        .post(controller.attachLecture)

        // Updates lecture;
        .put(controller.updateLecture)

        // Detach lecture from a place
        .delete(controller.detachLecture);

    router.route('/places/:placeId/lectures/:lectureId/speakers/')

        // Gets list of speakers of lecture.
        .get(
            (req, res, next) => controllerGeneric.find(req, res, next, { model: Place, paramName: 'placeId', findOne: true }),
            (req, res, next) => controllerGeneric.find(req, res, next, { model: Lecture, paramName: 'lectureId', findOne: true, prevName: 'lectures' }),
            (req, res, next) => controllerGeneric.find(req, res, next, { model: Speaker, paramName: '', findOne: false, prevName: 'speakers' }),
            controllerGeneric.respond
        );

    router.route('/places/:placeId/lectures/:lectureId/speakers/:speakerId')
        // Gets speaker by id.
        .get(
            (req, res, next) => controllerGeneric.find(req, res, next, { model: Place, paramName: 'placeId', findOne: true }),
            (req, res, next) => controllerGeneric.find(req, res, next, { model: Lecture, paramName: 'lectureId', findOne: true, prevName: 'lectures' }),
            (req, res, next) => controllerGeneric.find(req, res, next, { model: Speaker, paramName: 'speakerId', findOne: true, prevName: 'speakers' }),
            controllerGeneric.respond
        );
};