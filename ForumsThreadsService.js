const debug = require("sabio-debug");
const { dataProvider, TYPES } = require("sabio-data");
const { Paged } = require("sabio-models");
const _logger = debug.extend("forumsThreadsService");

class ForumsThreadsService {
  deleteById(id) {
    return new Promise(executor);

    function executor(resolve, reject) {
      const procName = "dbo.Forums-Threads_Delete_ById";

      const returnParamMapper = null;

      dataProvider.executeNonQuery(
        procName,
        inputParamMapper,
        returnParamMapper,
        onCompleted
      );

      function inputParamMapper(sqlParams) {
        sqlParams.input("Id", TYPES.Int, id);
      }

      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      }
    }
  }

  getPaginated(pageIndex, pageSize) {
    return new Promise(executor);

    function executor(resolve, reject) {
      let forums = null;
      let totalCount = 0;
      const procName = "dbo.Forums-Threads_SelectAll";
      const returnParamMapper = null;
      let response = null;

      dataProvider.executeCmd(
        procName,
        inputParamMapper,
        singleRecordMapper,
        returnParamMapper,
        onCompleted
      );

      function inputParamMapper(sqlParams) {
        sqlParams.input("PageIndex", TYPES.Int, pageIndex);
        sqlParams.input("PageSize", TYPES.Int, pageSize);
      }

      function singleRecordMapper(data, set) {
        if (!forums) {
          forums = [];
          totalCount = data.totalCount;
        }
        delete data.totalCount;
        forums.push(data);
      }

      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }

        if (forums) {
          response = new Paged(forums, pageIndex, pageSize, totalCount);
        }

        resolve(response);
      }
    }
  }

  getById(id) {
    return new Promise(executor);

    function executor(resolve, reject) {
      let forum = null;
      const procName = "dbo.Forums-Threads_Select_ById";
      const returnParamMapper = null;

      dataProvider.executeCmd(
        procName,
        inputParamMapper,
        singleRecordMapper,
        returnParamMapper,
        onCompleted
      );

      function inputParamMapper(sqlParams) {
        sqlParams.input("Id", TYPES.Int, id);
      }

      function singleRecordMapper(data, set) {
        _logger(data);
        forum = data;
      }

      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }
        resolve(forum);
      }
    }
  }

  getByCreatedBy(pageIndex, pageSize, userId) {
    return new Promise(executor);

    function executor(resolve, reject) {
      let forums = null;
      let totalCount = 0;
      const procName = "dbo.Forums-Threads_Select_ByCreatedBy";
      const returnParamMapper = null;
      let response = null;

      dataProvider.executeCmd(
        procName,
        inputParamMapper,
        singleRecordMapper,
        returnParamMapper,
        onCompleted
      );

      function inputParamMapper(sqlParams) {
        sqlParams.input("PageIndex", TYPES.Int, pageIndex);
        sqlParams.input("PageSize", TYPES.Int, pageSize);
        sqlParams.input("CreatedBy", TYPES.Int, userId);
      }

      function singleRecordMapper(data, set) {
        if (!forums) {
          forums = [];
          totalCount = data.totalCount;
        }
        delete data.totalCount;
        forums.push(data);
      }

      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }

        if (forums) {
          response = new Paged(forums, pageIndex, pageSize, totalCount);
        }

        resolve(response);
      }
    }
  }

  update(model, userId) {
    return new Promise(executor);

    function executor(resolve, reject) {
      const procName = "dbo.Forums-Threads_Update";
      const returnParamMapper = null;

      dataProvider.executeNonQuery(
        procName,
        inputParamMapper,
        returnParamMapper,
        onCompleted
      );
      function inputParamMapper(sqlParams) {
        sqlParams.input("Id", TYPES.Int, model.id);
        sqlParams.input("Subject", TYPES.NVarChar, model.subject);
        sqlParams.input("IsActive", TYPES.Bit, model.isActive);
        sqlParams.input("CreatedBy", TYPES.Int, userId);
      }
      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      }
    }
  }

  add(model, userId) {
    return new Promise(executor);

    function executor(resolve, reject) {
      const procName = "dbo.Forums-Threads_Insert";
      let forumsId = null;

      dataProvider.executeNonQuery(
        procName,
        inputParamMapper,
        returnParamMapper,
        onCompleted
      );

      function inputParamMapper(sqlParams) {
        sqlParams.output("Id", TYPES.Int);
        sqlParams.input("Subject", TYPES.NVarChar, model.subject);
        sqlParams.input("IsActive", TYPES.Bit, model.isActive);
        sqlParams.input("CreatedBy", TYPES.Int, userId);
      }

      function returnParamMapper(returnParams) {
        _logger(returnParams);

        if (returnParams) {
          forumsId = returnParams.id;
        }
      }

      function onCompleted(err, data) {
        if (err) {
          reject(err);
          return;
        }
        resolve(forumsId);
      }
    }
  }
}

const service = new ForumsThreadsService();

module.exports = service;
