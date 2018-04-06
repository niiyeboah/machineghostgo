const transitions = timeout => {
  return {
    entering: {
      opacity: 0,
      transform: "scale(1.5)"
    },
    entered: {
      transition: `
        opacity ${timeout}ms ease-in-out, 
        transform ${timeout}ms ease-in-out
      `,
      opacity: 1,
      transform: "scale(1)"
    },
    exiting: {
      transition: `
        opacity ${timeout}ms ease-in-out, 
        transform ${timeout}ms ease-in-out
    `,
      opacity: 0,
      transform: "scale(1.5)"
    }
  };
};

export default ({ timeout, status }) => transitions(timeout)[status];
