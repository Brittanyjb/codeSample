import React from "react";
import SingleThread from "./SingleThread";
import * as forumsThreadsService from "../../services/forumsThreadsService";
import debug from "sabio-debug";
import ThreadForm from "./ThreadForm";
import { toast } from "react-toastify";
import Pagination from "rc-pagination";
import locale from "rc-pagination";
import "rc-pagination/assets/index.css";
import PropTypes from "prop-types";
const _logger = debug.extend("Threads");

class Threads extends React.Component {
  state = {
    subject: "",
    isActive: true,
    forumThreadComponents: [],
    forumThreads: [],
    threadEdit: null,
    current: 1,
    pageIndex: 0,
    pageSize: 10,
    total: 0,
  };

  componentDidMount() {
    this.getThreads(0);
  }

  getThreads = (page) => {
    forumsThreadsService
      .getPaginated(page, 10)
      .then(this.onGetSuccess)
      .catch(this.onGetError);
  };

  onChange = (page) => {
    console.log(page);

    this.setState(
      () => {
        return { current: page };
      },
      () => this.getThreads(page - 1, 10)
    );
  };

  onGetSuccess = (data) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        forumThreadComponents: data.item.pagedItems.map(this.mapForumThreads),
        forumThreads: data.item.pagedItems,
        total: data.item.totalCount,
        pageIndex: data.item.pageIndex,
      };
    });
  };

  onGetError = (err) => {
    _logger("Error", { err });
    toast.error("Sorry, something went wrong.", {
      position: "bottom-center",
    });
  };

  deleteFromDom = (deletedForumThreadId) => {
    this.setState((prevState) => {
      const indexOfForumThread = prevState.forumThreadComponents.findIndex(
        (item) => {
          return parseInt(item.key) === deletedForumThreadId;
        }
      );
      const updatedForumThreads = [...prevState.forumThreadComponents];

      if (indexOfForumThread >= 0) {
        updatedForumThreads.splice(indexOfForumThread, 1);
      }
      _logger(updatedForumThreads);
      return {
        forumThreadComponents: updatedForumThreads,
      };
    });
  };

  updatesThread = (updateThread) => {
    this.setState((prevState) => {
      const existingThreadIndex = prevState.forumThreadComponents.findIndex(
        (item) => {
          return item.key === updateThread.id.toString();
        }
      );

      const updatedForumThreads = [...prevState.forumThreads];

      if (existingThreadIndex >= 0) {
        updatedForumThreads.splice(existingThreadIndex, 1, updateThread);
      }

      return {
        ...prevState,
        forumThreads: updatedForumThreads,
        forumThreadComponents: updatedForumThreads.map(this.mapForumThreads),
        threadEdit: false,
      };
    });
  };

  onEdit = (updateForumThread) => {
    _logger("onSubmit", { updateForumThread: updateForumThread });
    updateForumThread.id = parseInt(updateForumThread.id);
    this.setState((prevState) => {
      return {
        ...prevState,
        threadEdit: {
          id: updateForumThread.id,
          subject: updateForumThread.subject,
          isActive: true,
        },
      };
    });
  };

  removeThread = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        threadEdit: null,
      };
    });
  };

  mapForumThreads = (singleForumThread) => {
    _logger(`mapForumThreads ${singleForumThread.id}`);
    return (
      <SingleThread
        key={singleForumThread.id}
        forumThread={singleForumThread}
        onDelete={this.deleteFromDom}
        onEdit={this.onEdit}
        currentUser={this.props.currentUser}
      />
    );
  };

  onNewThread = () => {
    this.props.history.push("/forums/threads/new");
  };

  render() {
    return (
      <React.Fragment>
        {" "}
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div>
                  {" "}
                  <button
                    className="btn thread-panel-btn animated fadeInRight"
                    onClick={this.onNewThread}
                  >
                    New Forum
                  </button>
                </div>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-6">
                    {this.state.forumThreadComponents}
                  </div>
                  <div className="col-6">
                    {this.state.threadEdit && (
                      <ThreadForm
                        threadEdit={this.state.threadEdit}
                        removeThread={this.removeThread}
                        updateThread={this.updatesThread}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" thread-pagination">
          <Pagination
            onChange={this.onChange}
            current={this.state.current}
            pageIndex={this.state.pageIndex}
            pageSize={this.state.pageSize}
            total={this.state.total}
            nextIcon="Next"
            prevIcon="Prev"
            locale={locale}
          />
        </div>
      </React.Fragment>
    );
  }
}

Threads.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    isLoggedIn: PropTypes.bool,
    name: PropTypes.string,
  }),
};

export default Threads;
