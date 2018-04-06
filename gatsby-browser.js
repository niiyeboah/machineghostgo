import React, { createElement } from "react";
import { Transition } from "react-transition-group";
import createHistory from "history/createBrowserHistory";

import transition from "./src/utils/transition";

const timeout = 500;
const historyExitingEventType = `history::exiting`;
const getUserConfirmation = (pathname, callback) => {
  const event = new CustomEvent(historyExitingEventType, { detail: { pathname } });
  window.dispatchEvent(event);
  setTimeout(() => callback(true), timeout);
};
const history = createHistory({ getUserConfirmation });

history.block((location, action) => location.pathname);
exports.replaceHistory = () => history;

class ReplaceComponentRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { exiting: false, nextPageResources: {} };
    this.listenerHandler = this.listenerHandler.bind(this);
  }

  listenerHandler(event) {
    const pathname = event.detail.pathname;
    const getResourcesForPathname = this.props.loader.getResourcesForPathname;
    const callback = nextPageResources => this.setState({ nextPageResources });
    const nextPageResources = getResourcesForPathname(pathname, callback) || {};
    this.setState({ exiting: true, nextPageResources });
  }

  componentDidMount() {
    window.addEventListener(historyExitingEventType, this.listenerHandler);
  }

  componentWillUnmount() {
    window.removeEventListener(historyExitingEventType, this.listenerHandler);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.setState({ exiting: false, nextPageResources: {} });
    }
  }

  render() {
    const transitionProps = {
      appear: true,
      in: !this.state.exiting,
      key: this.props.location.key,
      timeout: { enter: 0, exit: timeout }
    };
    return (
      <Transition {...transitionProps}>
        {status =>
          createElement(this.props.pageResources.component, {
            ...this.props,
            ...this.props.pageResources.json,
            transition: {
              status,
              timeout,
              style: transition({ status, timeout }),
              nextPageResources: this.state.nextPageResources
            }
          })
        }
      </Transition>
    );
  }
}

exports.replaceComponentRenderer = ({ props, loader }) => {
  if (props.layout) return undefined;
  return createElement(ReplaceComponentRenderer, { ...props, loader });
};
