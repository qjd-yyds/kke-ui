import type { TransitionProps, TransitionGroupProps } from 'vue';
// appearActiveClass: "ant-move-up"
// appearToClass: "ant-move-up-appear ant-move-up-appear-active"
// enterActiveClass: "ant-move-up"
// enterFromClass: "ant-move-up-appear ant-move-up-enter ant-move-up-appear-prepare ant-move-up-enter-prepare"
// enterToClass: "ant-move-up-enter ant-move-up-appear ant-move-up-appear-active ant-move-up-enter-active"
// leaveActiveClass: "ant-move-up ant-move-up-leave"
// leaveToClass: "ant-move-up-leave-active"
// name: "ant-move-up"
export const getTransitionGroupProps = (transitionName: string, opt: TransitionProps = {}) => {
  const transitionProps: TransitionGroupProps = transitionName
    ? {
      name: transitionName,
      appear: true,
      // appearFromClass: `${transitionName}-appear ${transitionName}-appear-prepare`,
      appearActiveClass: `${transitionName}`,
      appearToClass: `${transitionName}-appear ${transitionName}-appear-active`,
      enterFromClass: `${transitionName}-appear ${transitionName}-enter ${transitionName}-appear-prepare ${transitionName}-enter-prepare`,
      enterActiveClass: `${transitionName}`,
      enterToClass: `${transitionName}-enter ${transitionName}-appear ${transitionName}-appear-active ${transitionName}-enter-active`,
      leaveActiveClass: `${transitionName} ${transitionName}-leave`,
      leaveToClass: `${transitionName}-leave-active`,
        ...opt
      }
    : { css: false, ...opt };
  return transitionProps;
};
