const asyncMiddleWare = (useRedux) => {
 return {
  useAsyncRedux: (fn) => {
    const [state, dispatch] = useRedux();
    fn(dispatch, state);
  },
 };
};

export default asyncMiddleWare;
