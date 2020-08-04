const Responses = require("sabio-web-models").Responses;
const BaseController = require("./BaseController");
const { RoutePrefix, Route } = require("sabio-routing");
const forumsThreadsService = require("sabio-services").forumsThreadsService;
const { ForumsThreads } = require("sabio-models").Schemas;
const AddSchema = ForumsThreads.AddSchema;
const UpdateSchema = ForumsThreads.UpdateSchema;

@RoutePrefix("/api/forums/threads")
class ForumsThreadsController extends BaseController {
  constructor() {
    super("ForumsThreadsController");
  }
  @Route("POST", "", AddSchema)
  add(req, res, next) {
    const userId = req.user.id;
    forumsThreadsService
      .add(req.model, userId)
      .then((itemId) => {
        const itemResponse = new Responses.ItemResponse(itemId);
        res.status(201).json(itemResponse);
      })
      .catch((err) => {
        res.status(500).json(new Responses.ErrorResponse(err));
      });
  }

  @Route("PUT", ":id(\\d+)", UpdateSchema)
  update(req, res, next) {
    const userId = req.user.id;
    forumsThreadsService
      .update(req.body, userId)
      .then(() => {
        const itemResponse = new Responses.SuccessResponse();
        res.status(200).json(itemResponse);
      })
      .catch((err) => {
        res.status(500).json(new Responses.ErrorResponse(err));
      });
  }

  @Route("GET", "current")
  createdByPaginated(req, res, next) {
    const pageIndex = req.query.pageIndex;
    const pageSize = req.query.pageSize;
    const userId = req.user.id;

    forumsThreadsService
      .getByCreatedBy(pageIndex, pageSize, userId)
      .then((item) => {
        let baseResponse = null;
        let code = 200;

        if (item) {
          baseResponse = new Responses.ItemResponse(item);
        } else {
          code = 404;
          baseResponse = new Responses.ErrorResponse("Records not found");
        }
        res.status(code).json(baseResponse);
      })
      .catch((err) => {
        res.status(500).json(new Responses.ErrorResponse(err));
      });
  }

  @Route("GET", ":id(\\d+)")
  getById(req, res, next) {
    forumsThreadsService
      .getById(req.params.id)
      .then((item) => {
        let baseResponse = null;
        let code = 200;

        if (item) {
          baseResponse = new Responses.ItemResponse(item);
        } else {
          code = 404;
          baseResponse = new Responses.ErrorResponse("Records not found");
        }
        res.status(code).json(baseResponse);
      })
      .catch((err) => {
        res.status(500).json(new Responses.ErrorResponse(err));
      });
  }

  @Route("DELETE", ":id(\\d+)")
  delete(req, res, next) {
    forumsThreadsService
      .deleteById(req.params.id)
      .then(() => {
        const itemResponse = new Responses.SuccessResponse();
        res.status(200).json(itemResponse);
      })
      .catch((err) => {
        res.status(500).json(new Responses.ErrorResponse(err));
      });
  }

  @Route("GET", "paged")
  paginateForums(req, res, next) {
    const pageIndex = req.query.pageIndex;
    const pageSize = req.query.pageSize;
    forumsThreadsService
      .getPaginated(pageIndex, pageSize)
      .then((item) => {
        let baseResponse = null;
        let code = 200;

        if (item) {
          baseResponse = new Responses.ItemResponse(item);
        } else {
          code = 404;
          baseResponse = new Responses.ErrorResponse("Records not found");
        }
        res.status(code).json(baseResponse);
      })
      .catch((err) => {
        res.status(500).json(new Responses.ErrorResponse(err));
      });
  }
}

module.exports = { controller: ForumsThreadsController };
