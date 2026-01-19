// // import React, { useEffect, useState, useCallback } from 'react';
// // import PropTypes from 'prop-types';

// // import { InvestigationalUseDialog } from '@ohif/ui-next';
// // import { HangingProtocolService, CommandsManager } from '@ohif/core';
// // import { useAppConfig } from '@state';
// // import ViewerHeader from './ViewerHeader';
// // import SidePanelWithServices from '../Components/SidePanelWithServices';
// // import { Onboarding, ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@ohif/ui-next';
// // import useResizablePanels from './ResizablePanelsHook';

// // const resizableHandleClassName = 'mt-[1px] bg-black';

// // function ViewerLayout({
// //   // From Extension Module Params
// //   extensionManager,
// //   servicesManager,
// //   hotkeysManager,
// //   commandsManager,
// //   // From Modes
// //   viewports,
// //   ViewportGridComp,
// //   leftPanelClosed = false,
// //   rightPanelClosed = false,
// //   leftPanelResizable = false,
// //   rightPanelResizable = false,
// //   leftPanelInitialExpandedWidth,
// //   rightPanelInitialExpandedWidth,
// //   leftPanelMinimumExpandedWidth,
// //   rightPanelMinimumExpandedWidth,
// // }: withAppTypes): React.FunctionComponent {
// //   const [appConfig] = useAppConfig();

// //   const { panelService, hangingProtocolService, customizationService } = servicesManager.services;
// //   const [showLoadingIndicator, setShowLoadingIndicator] = useState(appConfig.showLoadingIndicator);

// //   const hasPanels = useCallback(
// //     (side): boolean => !!panelService.getPanels(side).length,
// //     [panelService]
// //   );

// //   const [hasRightPanels, setHasRightPanels] = useState(hasPanels('right'));
// //   const [hasLeftPanels, setHasLeftPanels] = useState(hasPanels('left'));
// //   const [leftPanelClosedState, setLeftPanelClosed] = useState(leftPanelClosed);
// //   const [rightPanelClosedState, setRightPanelClosed] = useState(rightPanelClosed);

// //   const [
// //     leftPanelProps,
// //     rightPanelProps,
// //     resizablePanelGroupProps,
// //     resizableLeftPanelProps,
// //     resizableViewportGridPanelProps,
// //     resizableRightPanelProps,
// //     onHandleDragging,
// //   ] = useResizablePanels(
// //     leftPanelClosed,
// //     setLeftPanelClosed,
// //     rightPanelClosed,
// //     setRightPanelClosed,
// //     hasLeftPanels,
// //     hasRightPanels,
// //     leftPanelInitialExpandedWidth,
// //     rightPanelInitialExpandedWidth,
// //     leftPanelMinimumExpandedWidth,
// //     rightPanelMinimumExpandedWidth
// //   );

// //   const handleMouseEnter = () => {
// //     (document.activeElement as HTMLElement)?.blur();
// //   };

// //   const LoadingIndicatorProgress = customizationService.getCustomization(
// //     'ui.loadingIndicatorProgress'
// //   );

// //   /**
// //    * Set body classes (tailwindcss) that don't allow vertical
// //    * or horizontal overflow (no scrolling). Also guarantee window
// //    * is sized to our viewport.
// //    */
// //   useEffect(() => {
// //     document.body.classList.add('bg-black');
// //     document.body.classList.add('overflow-hidden');

// //     return () => {
// //       document.body.classList.remove('bg-black');
// //       document.body.classList.remove('overflow-hidden');
// //     };
// //   }, []);

// //   const getComponent = id => {
// //     const entry = extensionManager.getModuleEntry(id);

// //     if (!entry || !entry.component) {
// //       throw new Error(
// //         `${id} is not valid for an extension module or no component found from extension ${id}. Please verify your configuration or ensure that the extension is properly registered. It's also possible that your mode is utilizing a module from an extension that hasn't been included in its dependencies (add the extension to the "extensionDependencies" array in your mode's index.js file). Check the reference string to the extension in your Mode configuration`
// //       );
// //     }

// //     return { entry };
// //   };

// //   useEffect(() => {
// //     const { unsubscribe } = hangingProtocolService.subscribe(
// //       HangingProtocolService.EVENTS.PROTOCOL_CHANGED,

// //       // Todo: right now to set the loading indicator to false, we need to wait for the
// //       // hangingProtocolService to finish applying the viewport matching to each viewport,
// //       // however, this might not be the only approach to set the loading indicator to false. we need to explore this further.
// //       () => {
// //         setShowLoadingIndicator(false);
// //       }
// //     );

// //     return () => {
// //       unsubscribe();
// //     };
// //   }, [hangingProtocolService]);

// //   const getViewportComponentData = viewportComponent => {
// //     const { entry } = getComponent(viewportComponent.namespace);

// //     return {
// //       component: entry.component,
// //       isReferenceViewable: entry.isReferenceViewable,
// //       displaySetsToDisplay: viewportComponent.displaySetsToDisplay,
// //     };
// //   };

// //   useEffect(() => {
// //     const { unsubscribe } = panelService.subscribe(
// //       panelService.EVENTS.PANELS_CHANGED,
// //       ({ options }) => {
// //         setHasLeftPanels(hasPanels('left'));
// //         setHasRightPanels(hasPanels('right'));
// //         if (options?.leftPanelClosed !== undefined) {
// //           setLeftPanelClosed(options.leftPanelClosed);
// //         }
// //         if (options?.rightPanelClosed !== undefined) {
// //           setRightPanelClosed(options.rightPanelClosed);
// //         }
// //       }
// //     );

// //     return () => {
// //       unsubscribe();
// //     };
// //   }, [panelService, hasPanels]);

// //   const viewportComponents = viewports.map(getViewportComponentData);

// //   return (
// //     <div>
// //       <ViewerHeader
// //         hotkeysManager={hotkeysManager}
// //         extensionManager={extensionManager}
// //         servicesManager={servicesManager}
// //         appConfig={appConfig}
// //       />
// //       <div
// //         className="relative flex w-full flex-row flex-nowrap items-stretch overflow-hidden bg-black"
// //         style={{ height: 'calc(100vh - 52px' }}
// //       >
// //         <React.Fragment>
// //           {showLoadingIndicator && <LoadingIndicatorProgress className="h-full w-full bg-black" />}
// //           <ResizablePanelGroup {...resizablePanelGroupProps}>
// //             {/* LEFT SIDEPANELS */}
// //             {hasLeftPanels ? (
// //               <>
// //                 <ResizablePanel {...resizableLeftPanelProps}>
// //                   <SidePanelWithServices
// //                     side="left"
// //                     isExpanded={!leftPanelClosedState}
// //                     servicesManager={servicesManager}
// //                     {...leftPanelProps}
// //                   />
// //                 </ResizablePanel>
// //                 <ResizableHandle
// //                   onDragging={onHandleDragging}
// //                   disabled={!leftPanelResizable}
// //                   className={resizableHandleClassName}
// //                 />
// //               </>
// //             ) : null}
// //             {/* TOOLBAR + GRID */}
// //             <ResizablePanel {...resizableViewportGridPanelProps}>
// //               <div className="flex h-full flex-1 flex-col">
// //                 <div
// //                   className="relative flex h-full flex-1 items-center justify-center overflow-hidden bg-black"
// //                   onMouseEnter={handleMouseEnter}
// //                 >
// //                   <ViewportGridComp
// //                     servicesManager={servicesManager}
// //                     viewportComponents={viewportComponents}
// //                     commandsManager={commandsManager}
// //                   />
// //                 </div>
// //               </div>
// //             </ResizablePanel>
// //             {hasRightPanels ? (
// //               <>
// //                 <ResizableHandle
// //                   onDragging={onHandleDragging}
// //                   disabled={!rightPanelResizable}
// //                   className={resizableHandleClassName}
// //                 />
// //                 <ResizablePanel {...resizableRightPanelProps}>
// //                   <SidePanelWithServices
// //                     side="right"
// //                     isExpanded={!rightPanelClosedState}
// //                     servicesManager={servicesManager}
// //                     {...rightPanelProps}
// //                   />
// //                 </ResizablePanel>
// //               </>
// //             ) : null}
// //           </ResizablePanelGroup>
// //         </React.Fragment>
// //       </div>
// //       <Onboarding tours={customizationService.getCustomization('ohif.tours')} />
// //       <InvestigationalUseDialog dialogConfiguration={appConfig?.investigationalUseDialog} />
// //     </div>
// //   );
// // }

// // ViewerLayout.propTypes = {
// //   // From extension module params
// //   extensionManager: PropTypes.shape({
// //     getModuleEntry: PropTypes.func.isRequired,
// //   }).isRequired,
// //   commandsManager: PropTypes.instanceOf(CommandsManager),
// //   servicesManager: PropTypes.object.isRequired,
// //   // From modes
// //   leftPanels: PropTypes.array,
// //   rightPanels: PropTypes.array,
// //   leftPanelClosed: PropTypes.bool.isRequired,
// //   rightPanelClosed: PropTypes.bool.isRequired,
// //   /** Responsible for rendering our grid of viewports; provided by consuming application */
// //   children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
// //   viewports: PropTypes.array,
// // };

// // export default ViewerLayout;







// // import React, { useEffect, useState, useCallback } from 'react';
// // import PropTypes from 'prop-types';

// // import { InvestigationalUseDialog } from '@ohif/ui-next';
// // import { HangingProtocolService, CommandsManager } from '@ohif/core';
// // import { useAppConfig } from '@state';
// // import ViewerHeader from './ViewerHeader';
// // import SidePanelWithServices from '../Components/SidePanelWithServices';
// // import { Onboarding, ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@ohif/ui-next';
// // import useResizablePanels from './ResizablePanelsHook';

// // const resizableHandleClassName = 'mt-[1px] bg-black';

// // function ViewerLayout({
// //   extensionManager,
// //   servicesManager,
// //   hotkeysManager,
// //   commandsManager,
// //   viewports,
// //   ViewportGridComp,
// //   leftPanelClosed = false,
// //   rightPanelClosed = false,
// //   leftPanelResizable = false,
// //   rightPanelResizable = false,
// //   leftPanelInitialExpandedWidth,
// //   rightPanelInitialExpandedWidth,
// //   leftPanelMinimumExpandedWidth,
// //   rightPanelMinimumExpandedWidth,
// // }: withAppTypes): React.FunctionComponent {
// //   const [appConfig] = useAppConfig();

// //   const { panelService, hangingProtocolService, customizationService } = servicesManager.services;
// //   const [showLoadingIndicator, setShowLoadingIndicator] = useState(appConfig.showLoadingIndicator);

// //   const hasPanels = useCallback(
// //     (side): boolean => !!panelService.getPanels(side).length,
// //     [panelService]
// //   );

// //   const [hasRightPanels, setHasRightPanels] = useState(hasPanels('right'));
// //   const [hasLeftPanels, setHasLeftPanels] = useState(hasPanels('left'));
// //   const [leftPanelClosedState, setLeftPanelClosed] = useState(leftPanelClosed);
// //   const [rightPanelClosedState, setRightPanelClosed] = useState(rightPanelClosed);

// //   const [
// //     leftPanelProps,
// //     rightPanelProps,
// //     resizablePanelGroupProps,
// //     resizableLeftPanelProps,
// //     resizableViewportGridPanelProps,
// //     resizableRightPanelProps,
// //     onHandleDragging,
// //   ] = useResizablePanels(
// //     leftPanelClosed,
// //     setLeftPanelClosed,
// //     rightPanelClosed,
// //     setRightPanelClosed,
// //     hasLeftPanels,
// //     hasRightPanels,
// //     leftPanelInitialExpandedWidth,
// //     rightPanelInitialExpandedWidth,
// //     leftPanelMinimumExpandedWidth,
// //     rightPanelMinimumExpandedWidth
// //   );

// //   const handleMouseEnter = () => {
// //     (document.activeElement as HTMLElement)?.blur();
// //   };

// //   const LoadingIndicatorProgress = customizationService.getCustomization(
// //     'ui.loadingIndicatorProgress'
// //   );

// //   useEffect(() => {
// //     document.body.classList.add('bg-black');
// //     document.body.classList.add('overflow-hidden');

// //     return () => {
// //       document.body.classList.remove('bg-black');
// //       document.body.classList.remove('overflow-hidden');
// //     };
// //   }, []);

// //   const getComponent = id => {
// //     const entry = extensionManager.getModuleEntry(id);

// //     if (!entry || !entry.component) {
// //       throw new Error(
// //         `${id} is not valid for an extension module or no component found from extension ${id}. Please verify your configuration or ensure that the extension is properly registered. It's also possible that your mode is utilizing a module from an extension that hasn't been included in its dependencies (add the extension to the "extensionDependencies" array in your mode's index.js file). Check the reference string to the extension in your Mode configuration`
// //       );
// //     }

// //     return { entry };
// //   };

// //   useEffect(() => {
// //     const { unsubscribe } = hangingProtocolService.subscribe(
// //       HangingProtocolService.EVENTS.PROTOCOL_CHANGED,
// //       () => {
// //         setShowLoadingIndicator(false);
// //       }
// //     );

// //     return () => {
// //       unsubscribe();
// //     };
// //   }, [hangingProtocolService]);

// //   const getViewportComponentData = viewportComponent => {
// //     const { entry } = getComponent(viewportComponent.namespace);

// //     return {
// //       component: entry.component,
// //       isReferenceViewable: entry.isReferenceViewable,
// //       displaySetsToDisplay: viewportComponent.displaySetsToDisplay,
// //     };
// //   };

// //   useEffect(() => {
// //     const { unsubscribe } = panelService.subscribe(
// //       panelService.EVENTS.PANELS_CHANGED,
// //       ({ options }) => {
// //         setHasLeftPanels(hasPanels('left'));
// //         setHasRightPanels(hasPanels('right'));
// //         if (options?.leftPanelClosed !== undefined) {
// //           setLeftPanelClosed(options.leftPanelClosed);
// //         }
// //         if (options?.rightPanelClosed !== undefined) {
// //           setRightPanelClosed(options.rightPanelClosed);
// //         }
// //       }
// //     );

// //     return () => {
// //       unsubscribe();
// //     };
// //   }, [panelService, hasPanels]);

// //   const viewportComponents = viewports.map(getViewportComponentData);

// //   return (
// //     <div>
// //       <ViewerHeader
// //         hotkeysManager={hotkeysManager}
// //         extensionManager={extensionManager}
// //         servicesManager={servicesManager}
// //         appConfig={appConfig}
// //       />
// //       <div
// //         className="relative flex w-full flex-col flex-nowrap items-stretch overflow-hidden bg-black"
// //         style={{ height: 'calc(100vh - 52px)' }}
// //       >
// //         <React.Fragment>
// //           {showLoadingIndicator && <LoadingIndicatorProgress className="h-full w-full bg-black" />}
// //           <div className="flex h-[70%] w-full">
// //             <ResizablePanelGroup {...resizablePanelGroupProps}>
// //               <ResizablePanel {...resizableViewportGridPanelProps}>
// //                 <div className="flex h-full flex-1 flex-col">
// //                   <div
// //                     className="relative flex h-full flex-1 items-center justify-center overflow-hidden bg-black"
// //                     onMouseEnter={handleMouseEnter}
// //                   >
// //                     <ViewportGridComp
// //                       servicesManager={servicesManager}
// //                       viewportComponents={viewportComponents}
// //                       commandsManager={commandsManager}
// //                     />
// //                   </div>
// //                 </div>
// //               </ResizablePanel>
// //               {hasRightPanels ? (
// //                 <>
// //                   <ResizableHandle
// //                     onDragging={onHandleDragging}
// //                     disabled={!rightPanelResizable}
// //                     className={resizableHandleClassName}
// //                   />
// //                   <ResizablePanel {...resizableRightPanelProps}>
// //                     <SidePanelWithServices
// //                       side="right"
// //                       isExpanded={!rightPanelClosedState}
// //                       servicesManager={servicesManager}
// //                       {...rightPanelProps}
// //                     />
// //                   </ResizablePanel>
// //                 </>
// //               ) : null}
// //             </ResizablePanelGroup>
// //           </div>
// //           {/* {hasLeftPanels && (
// //             <div className="flex h-[30%] w-full border-t border-black overflow-hidden">
// //               <div className="flex w-full">
// //                 <SidePanelWithServices
// //                   side="left"
// //                   isExpanded={true}
// //                   servicesManager={servicesManager}
// //                   {...leftPanelProps}
// //                 />
// //               </div>
// //             </div>
// //           )} */}
// // {hasLeftPanels && (
// //   <div className="flex h-[30%] w-full border-t border-black overflow-hidden">
// //     <SidePanelWithServices
// //       side="left"
// //       isExpanded={true}
// //       servicesManager={servicesManager}
// //       expandedWidth={10000}
// //       collapsedWidth={25}
// //       activeTabIndex={0}
// //       onClose={() => {}}
// //       onOpen={() => {}}
// //       className="bottom-panel"
// //       {...leftPanelProps}
// //     />
// //   </div>
// // )}
// //         </React.Fragment>
// //       </div>
// //       <Onboarding tours={customizationService.getCustomization('ohif.tours')} />
// //       <InvestigationalUseDialog dialogConfiguration={appConfig?.investigationalUseDialog} />
// //     </div>
// //   );
// // }

// // ViewerLayout.propTypes = {
// //   extensionManager: PropTypes.shape({
// //     getModuleEntry: PropTypes.func.isRequired,
// //   }).isRequired,
// //   commandsManager: PropTypes.instanceOf(CommandsManager),
// //   servicesManager: PropTypes.object.isRequired,
// //   leftPanels: PropTypes.array,
// //   rightPanels: PropTypes.array,
// //   leftPanelClosed: PropTypes.bool.isRequired,
// //   rightPanelClosed: PropTypes.bool.isRequired,
// //   children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
// //   viewports: PropTypes.array,
// // };

// // export default ViewerLayout;














// import React, { useEffect, useState, useCallback } from 'react';
// import PropTypes from 'prop-types';

// import { InvestigationalUseDialog } from '@ohif/ui-next';
// import { HangingProtocolService, CommandsManager } from '@ohif/core';
// import { useAppConfig } from '@state';
// import ViewerHeader from './ViewerHeader';
// import SidePanelWithServices from '../Components/SidePanelWithServices';
// import { Onboarding, ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@ohif/ui-next';
// import useResizablePanels from './ResizablePanelsHook';

// const resizableHandleClassName = 'mt-[1px] bg-black';

// function ViewerLayout({
//   extensionManager,
//   servicesManager,
//   hotkeysManager,
//   commandsManager,
//   viewports,
//   ViewportGridComp,
//   leftPanelClosed = false,
//   rightPanelClosed = false,
//   leftPanelResizable = false,
//   rightPanelResizable = false,
//   leftPanelInitialExpandedWidth,
//   rightPanelInitialExpandedWidth,
//   leftPanelMinimumExpandedWidth,
//   rightPanelMinimumExpandedWidth,
// }: withAppTypes): React.FunctionComponent {
//   const [appConfig] = useAppConfig();

//   const { panelService, hangingProtocolService, customizationService } = servicesManager.services;
//   const [showLoadingIndicator, setShowLoadingIndicator] = useState(appConfig.showLoadingIndicator);

//   const hasPanels = useCallback(
//     (side): boolean => !!panelService.getPanels(side).length,
//     [panelService]
//   );

//   const [hasRightPanels, setHasRightPanels] = useState(hasPanels('right'));
//   const [hasLeftPanels, setHasLeftPanels] = useState(hasPanels('left'));
//   const [leftPanelClosedState, setLeftPanelClosed] = useState(leftPanelClosed);
//   const [rightPanelClosedState, setRightPanelClosed] = useState(rightPanelClosed);

//   const [
//     leftPanelProps,
//     rightPanelProps,
//     resizablePanelGroupProps,
//     resizableLeftPanelProps,
//     resizableViewportGridPanelProps,
//     resizableRightPanelProps,
//     onHandleDragging,
//   ] = useResizablePanels(
//     leftPanelClosed,
//     setLeftPanelClosed,
//     rightPanelClosed,
//     setRightPanelClosed,
//     hasLeftPanels,
//     hasRightPanels,
//     leftPanelInitialExpandedWidth,
//     rightPanelInitialExpandedWidth,
//     leftPanelMinimumExpandedWidth,
//     rightPanelMinimumExpandedWidth
//   );

//   const handleMouseEnter = () => {
//     (document.activeElement as HTMLElement)?.blur();
//   };

//   const LoadingIndicatorProgress = customizationService.getCustomization(
//     'ui.loadingIndicatorProgress'
//   );

//   useEffect(() => {
//     document.body.classList.add('bg-black');
//     document.body.classList.add('overflow-hidden');

//     return () => {
//       document.body.classList.remove('bg-black');
//       document.body.classList.remove('overflow-hidden');
//     };
//   }, []);

//   const getComponent = id => {
//     const entry = extensionManager.getModuleEntry(id);

//     if (!entry || !entry.component) {
//       throw new Error(
//         `${id} is not valid for an extension module or no component found from extension ${id}. Please verify your configuration or ensure that the extension is properly registered. It's also possible that your mode is utilizing a module from an extension that hasn't been included in its dependencies (add the extension to the "extensionDependencies" array in your mode's index.js file). Check the reference string to the extension in your Mode configuration`
//       );
//     }

//     return { entry };
//   };

//   useEffect(() => {
//     const { unsubscribe } = hangingProtocolService.subscribe(
//       HangingProtocolService.EVENTS.PROTOCOL_CHANGED,
//       () => {
//         setShowLoadingIndicator(false);
//       }
//     );

//     return () => {
//       unsubscribe();
//     };
//   }, [hangingProtocolService]);

//   const getViewportComponentData = viewportComponent => {
//     const { entry } = getComponent(viewportComponent.namespace);

//     return {
//       component: entry.component,
//       isReferenceViewable: entry.isReferenceViewable,
//       displaySetsToDisplay: viewportComponent.displaySetsToDisplay,
//     };
//   };

//   useEffect(() => {
//     const { unsubscribe } = panelService.subscribe(
//       panelService.EVENTS.PANELS_CHANGED,
//       ({ options }) => {
//         setHasLeftPanels(hasPanels('left'));
//         setHasRightPanels(hasPanels('right'));
//         if (options?.leftPanelClosed !== undefined) {
//           setLeftPanelClosed(options.leftPanelClosed);
//         }
//         if (options?.rightPanelClosed !== undefined) {
//           setRightPanelClosed(options.rightPanelClosed);
//         }
//       }
//     );

//     return () => {
//       unsubscribe();
//     };
//   }, [panelService, hasPanels]);

//   const viewportComponents = viewports.map(getViewportComponentData);
// console.log('leftPanelProps:', leftPanelProps);
//   return (
//     <div>
//       <ViewerHeader
//         hotkeysManager={hotkeysManager}
//         extensionManager={extensionManager}
//         servicesManager={servicesManager}
//         appConfig={appConfig}
//       />
//       <div
//         className="relative flex w-full flex-col flex-nowrap items-stretch overflow-hidden bg-black"
//         style={{ height: 'calc(100svh - 100px)' }}
//       >
//         <React.Fragment>
//           {showLoadingIndicator && <LoadingIndicatorProgress className="h-full w-full bg-black" />}
//           <div className="flex h-[calc(100%-180px)] w-full">
//             <ResizablePanelGroup {...resizablePanelGroupProps}>
//               <ResizablePanel {...resizableViewportGridPanelProps}>
//                 <div className="flex h-full flex-1 flex-col">
//                   <div
//                     className="relative flex h-full flex-1 items-center justify-center overflow-hidden bg-black"
//                     onMouseEnter={handleMouseEnter}
//                   >
//                     <ViewportGridComp
//                       servicesManager={servicesManager}
//                       viewportComponents={viewportComponents}
//                       commandsManager={commandsManager}
//                     />
//                   </div>
//                 </div>
//               </ResizablePanel>
//               {hasRightPanels ? (
//                 <>
//                   <ResizableHandle
//                     onDragging={onHandleDragging}
//                     disabled={!rightPanelResizable}
//                     className={resizableHandleClassName}
//                   />
//                   <ResizablePanel {...resizableRightPanelProps}>
//                     <SidePanelWithServices
//                       side="right"
//                       isExpanded={!rightPanelClosedState}
//                       servicesManager={servicesManager}
//                       {...rightPanelProps}
//                     />
//                   </ResizablePanel>
//                 </>
//               ) : null}
//             </ResizablePanelGroup>
//           </div>
//      {hasLeftPanels && (
//   // <div className="flex h-[30%] w-full border-t border-black overflow-x-auto overflow-y-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
//   //   <SidePanelWithServices
//   //     side="left"
//   //     isExpanded={true}
//   //     servicesManager={servicesManager}
//   //     expandedWidth={10000}
//   //     collapsedWidth={25}
//   //     activeTabIndex={0}
//   //     onClose={() => {}}
//   //     onOpen={() => {}}
//   //     className="bottom-panel"
//   //     expandedInsideBorderSize={0}
//   //     collapsedInsideBorderSize={4}
//   //     collapsedOutsideBorderSize={4}
//   //   />
//   // </div>
// <div className="flex h-[180px] w-full border-t border-black overflow-x-auto overflow-y-hidden items-start pb-2"
//   style={{
//     scrollbarWidth: 'thin',
//     scrollbarColor: '#ff6600 transparent'
//   }}
// >
//   <SidePanelWithServices
//     side="left"
//     isExpanded={true}
//     servicesManager={servicesManager}
//     expandedWidth={10000}
//     collapsedWidth={25}
//     activeTabIndex={0}
//     onClose={() => {}}
//     onOpen={() => {}}
//     className="bottom-panel"
//     expandedInsideBorderSize={0}
//     collapsedInsideBorderSize={4}
//     collapsedOutsideBorderSize={4}
//   />
// </div>
// )}
//         </React.Fragment>
//       </div>
//       <Onboarding tours={customizationService.getCustomization('ohif.tours')} />
//       <InvestigationalUseDialog dialogConfiguration={appConfig?.investigationalUseDialog} />
//     </div>
//   );
// }

// ViewerLayout.propTypes = {
//   extensionManager: PropTypes.shape({
//     getModuleEntry: PropTypes.func.isRequired,
//   }).isRequired,
//   commandsManager: PropTypes.instanceOf(CommandsManager),
//   servicesManager: PropTypes.object.isRequired,
//   leftPanels: PropTypes.array,
//   rightPanels: PropTypes.array,
//   leftPanelClosed: PropTypes.bool.isRequired,
//   rightPanelClosed: PropTypes.bool.isRequired,
//   children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
//   viewports: PropTypes.array,
// };

// export default ViewerLayout;































// import React, { useEffect, useState, useCallback } from 'react';
// import PropTypes from 'prop-types';

// import { InvestigationalUseDialog } from '@ohif/ui-next';
// import { HangingProtocolService, CommandsManager } from '@ohif/core';
// import { useAppConfig } from '@state';
// import ViewerHeader from './ViewerHeader';
// import SidePanelWithServices from '../Components/SidePanelWithServices';
// import { Onboarding, ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@ohif/ui-next';
// import useResizablePanels from './ResizablePanelsHook';

// const resizableHandleClassName = 'mt-[1px] bg-black';

// function ViewerLayout({
//   extensionManager,
//   servicesManager,
//   hotkeysManager,
//   commandsManager,
//   viewports,
//   ViewportGridComp,
//   leftPanelClosed = false,
//   rightPanelClosed = false,
//   leftPanelResizable = false,
//   rightPanelResizable = false,
//   leftPanelInitialExpandedWidth,
//   rightPanelInitialExpandedWidth,
//   leftPanelMinimumExpandedWidth,
//   rightPanelMinimumExpandedWidth,
// }: withAppTypes): React.FunctionComponent {
//   const [appConfig] = useAppConfig();

//   const { panelService, hangingProtocolService, customizationService } = servicesManager.services;
//   const [showLoadingIndicator, setShowLoadingIndicator] = useState(appConfig.showLoadingIndicator);

//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const [layoutKey, setLayoutKey] = useState(0);

//   const hasPanels = useCallback(
//     (side): boolean => !!panelService.getPanels(side).length,
//     [panelService]
//   );

//   const [hasRightPanels, setHasRightPanels] = useState(hasPanels('right'));
//   const [hasLeftPanels, setHasLeftPanels] = useState(hasPanels('left'));
//   const [leftPanelClosedState, setLeftPanelClosed] = useState(leftPanelClosed);
//   const [rightPanelClosedState, setRightPanelClosed] = useState(rightPanelClosed);

//   const [
//     leftPanelProps,
//     rightPanelProps,
//     resizablePanelGroupProps,
//     resizableLeftPanelProps,
//     resizableViewportGridPanelProps,
//     resizableRightPanelProps,
//     onHandleDragging,
//   ] = useResizablePanels(
//     leftPanelClosed,
//     setLeftPanelClosed,
//     rightPanelClosed,
//     setRightPanelClosed,
//     hasLeftPanels,
//     hasRightPanels,
//     leftPanelInitialExpandedWidth,
//     rightPanelInitialExpandedWidth,
//     leftPanelMinimumExpandedWidth,
//     rightPanelMinimumExpandedWidth
//   );

//   const handleMouseEnter = () => {
//     (document.activeElement as HTMLElement)?.blur();
//   };

//   const LoadingIndicatorProgress = customizationService.getCustomization(
//     'ui.loadingIndicatorProgress'
//   );

//   useEffect(() => {
//     const handleResize = () => {
//       const wasMobile = isMobile;
//       const nowMobile = window.innerWidth <= 768;

//       if (wasMobile !== nowMobile) {
//         setIsMobile(nowMobile);
//         setLayoutKey(prev => prev + 1);
//       }
//     };

//     let resizeTimer;
//     const debouncedResize = () => {
//       clearTimeout(resizeTimer);
//       resizeTimer = setTimeout(handleResize, 150);
//     };

//     window.addEventListener('resize', debouncedResize);
//     return () => {
//       window.removeEventListener('resize', debouncedResize);
//       clearTimeout(resizeTimer);
//     };
//   }, [isMobile]);

//   useEffect(() => {
//     document.body.classList.add('bg-black');
//     document.body.classList.add('overflow-hidden');

//     return () => {
//       document.body.classList.remove('bg-black');
//       document.body.classList.remove('overflow-hidden');
//     };
//   }, []);

//   const getComponent = id => {
//     const entry = extensionManager.getModuleEntry(id);

//     if (!entry || !entry.component) {
//       throw new Error(
//         `${id} is not valid for an extension module or no component found from extension ${id}. Please verify your configuration or ensure that the extension is properly registered. It's also possible that your mode is utilizing a module from an extension that hasn't been included in its dependencies (add the extension to the "extensionDependencies" array in your mode's index.js file). Check the reference string to the extension in your Mode configuration`
//       );
//     }

//     return { entry };
//   };

//   useEffect(() => {
//     const { unsubscribe } = hangingProtocolService.subscribe(
//       HangingProtocolService.EVENTS.PROTOCOL_CHANGED,
//       () => {
//         setShowLoadingIndicator(false);
//       }
//     );

//     return () => {
//       unsubscribe();
//     };
//   }, [hangingProtocolService]);

//   const getViewportComponentData = viewportComponent => {
//     const { entry } = getComponent(viewportComponent.namespace);

//     return {
//       component: entry.component,
//       isReferenceViewable: entry.isReferenceViewable,
//       displaySetsToDisplay: viewportComponent.displaySetsToDisplay,
//     };
//   };

//   useEffect(() => {
//     const { unsubscribe } = panelService.subscribe(
//       panelService.EVENTS.PANELS_CHANGED,
//       ({ options }) => {
//         setHasLeftPanels(hasPanels('left'));
//         setHasRightPanels(hasPanels('right'));
//         if (options?.leftPanelClosed !== undefined) {
//           setLeftPanelClosed(options.leftPanelClosed);
//         }
//         if (options?.rightPanelClosed !== undefined) {
//           setRightPanelClosed(options.rightPanelClosed);
//         }
//       }
//     );

//     return () => {
//       unsubscribe();
//     };
//   }, [panelService, hasPanels]);

//   const viewportComponents = viewports.map(getViewportComponentData);

//   if (isMobile) {
//     return (
//       <div key={`mobile-${layoutKey}`}>
//         <ViewerHeader
//           hotkeysManager={hotkeysManager}
//           extensionManager={extensionManager}
//           servicesManager={servicesManager}
//           appConfig={appConfig}
//         />
//         <div
//           className="relative flex w-full flex-col flex-nowrap items-stretch overflow-hidden bg-black"
//           style={{ height: 'calc(100vh - 52px)' }}
//         >
//           <React.Fragment>
//             {showLoadingIndicator && <LoadingIndicatorProgress className="h-full w-full bg-black" />}
//             <div className="flex h-[calc(100%-180px)] w-full">
//               <ResizablePanelGroup {...resizablePanelGroupProps}>
//                 <ResizablePanel {...resizableViewportGridPanelProps}>
//                   <div className="flex h-full flex-1 flex-col">
//                     <div
//                       className="relative flex h-full flex-1 items-center justify-center overflow-hidden bg-black"
//                       onMouseEnter={handleMouseEnter}
//                     >
//                       <ViewportGridComp
//                         servicesManager={servicesManager}
//                         viewportComponents={viewportComponents}
//                         commandsManager={commandsManager}
//                       />
//                     </div>
//                   </div>
//                 </ResizablePanel>
//                 {hasRightPanels ? (
//                   <>
//                     <ResizableHandle
//                       onDragging={onHandleDragging}
//                       disabled={!rightPanelResizable}
//                       className={resizableHandleClassName}
//                     />
//                     <ResizablePanel {...resizableRightPanelProps}>
//                       <SidePanelWithServices
//                         side="right"
//                         isExpanded={!rightPanelClosedState}
//                         servicesManager={servicesManager}
//                         {...rightPanelProps}
//                       />
//                     </ResizablePanel>
//                   </>
//                 ) : null}
//               </ResizablePanelGroup>
//             </div>
//             {hasLeftPanels && (
//               <div
//                 className="flex h-[180px] w-full border-t border-black overflow-x-auto overflow-y-hidden items-start pb-2"
//                 style={{
//                   scrollbarWidth: 'thin',
//                   scrollbarColor: '#ff6600 transparent'
//                 }}
//               >
//                 <SidePanelWithServices
//                   side="left"
//                   isExpanded={true}
//                   servicesManager={servicesManager}
//                   expandedWidth={10000}
//                   collapsedWidth={25}
//                   activeTabIndex={0}
//                   onClose={() => {}}
//                   onOpen={() => {}}
//                   className="bottom-panel"
//                   expandedInsideBorderSize={0}
//                   collapsedInsideBorderSize={4}
//                   collapsedOutsideBorderSize={4}
//                 />
//               </div>
//             )}
//           </React.Fragment>
//         </div>
//         <Onboarding tours={customizationService.getCustomization('ohif.tours')} />
//         <InvestigationalUseDialog dialogConfiguration={appConfig?.investigationalUseDialog} />
//       </div>
//     );
//   }

//   return (
//     <div key={`desktop-${layoutKey}`}>
//       <ViewerHeader
//         hotkeysManager={hotkeysManager}
//         extensionManager={extensionManager}
//         servicesManager={servicesManager}
//         appConfig={appConfig}
//       />
//       <div
//         className="relative flex w-full flex-row flex-nowrap items-stretch overflow-hidden bg-black"
//         style={{ height: 'calc(100vh - 52px)' }}
//       >
//         <React.Fragment>
//           {showLoadingIndicator && <LoadingIndicatorProgress className="h-full w-full bg-black" />}
//           <ResizablePanelGroup {...resizablePanelGroupProps}>
//             {hasLeftPanels ? (
//               <>
//                 <ResizablePanel {...resizableLeftPanelProps}>
//                   <SidePanelWithServices
//                     side="left"
//                     isExpanded={!leftPanelClosedState}
//                     servicesManager={servicesManager}
//                     {...leftPanelProps}
//                   />
//                 </ResizablePanel>
//                 <ResizableHandle
//                   onDragging={onHandleDragging}
//                   disabled={!leftPanelResizable}
//                   className={resizableHandleClassName}
//                 />
//               </>
//             ) : null}
//             <ResizablePanel {...resizableViewportGridPanelProps}>
//               <div className="flex h-full flex-1 flex-col">
//                 <div
//                   className="relative flex h-full flex-1 items-center justify-center overflow-hidden bg-black"
//                   onMouseEnter={handleMouseEnter}
//                 >
//                   <ViewportGridComp
//                     servicesManager={servicesManager}
//                     viewportComponents={viewportComponents}
//                     commandsManager={commandsManager}
//                   />
//                 </div>
//               </div>
//             </ResizablePanel>
//             {hasRightPanels ? (
//               <>
//                 <ResizableHandle
//                   onDragging={onHandleDragging}
//                   disabled={!rightPanelResizable}
//                   className={resizableHandleClassName}
//                 />
//                 <ResizablePanel {...resizableRightPanelProps}>
//                   <SidePanelWithServices
//                     side="right"
//                     isExpanded={!rightPanelClosedState}
//                     servicesManager={servicesManager}
//                     {...rightPanelProps}
//                   />
//                 </ResizablePanel>
//               </>
//             ) : null}
//           </ResizablePanelGroup>
//         </React.Fragment>
//       </div>
//       <Onboarding tours={customizationService.getCustomization('ohif.tours')} />
//       <InvestigationalUseDialog dialogConfiguration={appConfig?.investigationalUseDialog} />
//     </div>
//   );
// }

// ViewerLayout.propTypes = {
//   extensionManager: PropTypes.shape({
//     getModuleEntry: PropTypes.func.isRequired,
//   }).isRequired,
//   commandsManager: PropTypes.instanceOf(CommandsManager),
//   servicesManager: PropTypes.object.isRequired,
//   leftPanels: PropTypes.array,
//   rightPanels: PropTypes.array,
//   leftPanelClosed: PropTypes.bool.isRequired,
//   rightPanelClosed: PropTypes.bool.isRequired,
//   children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
//   viewports: PropTypes.array,
// };

// export default ViewerLayout;















// import React, { useEffect, useState, useCallback } from 'react';
// import PropTypes from 'prop-types';

// import { InvestigationalUseDialog } from '@ohif/ui-next';
// import { HangingProtocolService, CommandsManager } from '@ohif/core';
// import { useAppConfig } from '@state';
// import ViewerHeader from './ViewerHeader';
// import SidePanelWithServices from '../Components/SidePanelWithServices';
// import { Onboarding, ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@ohif/ui-next';
// import useResizablePanels from './ResizablePanelsHook';

// const resizableHandleClassName = 'mt-[1px] bg-black';

// function ViewerLayout({
//   extensionManager,
//   servicesManager,
//   hotkeysManager,
//   commandsManager,
//   viewports,
//   ViewportGridComp,
//   leftPanelClosed = false,
//   rightPanelClosed = false,
//   leftPanelResizable = false,
//   rightPanelResizable = false,
//   leftPanelInitialExpandedWidth,
//   rightPanelInitialExpandedWidth,
//   leftPanelMinimumExpandedWidth,
//   rightPanelMinimumExpandedWidth,
// }: withAppTypes): React.FunctionComponent {
//   const [appConfig] = useAppConfig();

//   const { panelService, hangingProtocolService, customizationService } = servicesManager.services;
//   const [showLoadingIndicator, setShowLoadingIndicator] = useState(appConfig.showLoadingIndicator);

//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const [layoutKey, setLayoutKey] = useState(0);

//   const hasPanels = useCallback(
//     (side): boolean => !!panelService.getPanels(side).length,
//     [panelService]
//   );

//   const [hasRightPanels, setHasRightPanels] = useState(hasPanels('right'));
//   const [hasLeftPanels, setHasLeftPanels] = useState(hasPanels('left'));
//   const [leftPanelClosedState, setLeftPanelClosed] = useState(leftPanelClosed);
//   const [rightPanelClosedState, setRightPanelClosed] = useState(rightPanelClosed);

//   const [
//     leftPanelProps,
//     rightPanelProps,
//     resizablePanelGroupProps,
//     resizableLeftPanelProps,
//     resizableViewportGridPanelProps,
//     resizableRightPanelProps,
//     onHandleDragging,
//   ] = useResizablePanels(
//     leftPanelClosed,
//     setLeftPanelClosed,
//     rightPanelClosed,
//     setRightPanelClosed,
//     hasLeftPanels,
//     hasRightPanels,
//     leftPanelInitialExpandedWidth,
//     rightPanelInitialExpandedWidth,
//     leftPanelMinimumExpandedWidth,
//     rightPanelMinimumExpandedWidth
//   );

//   const handleMouseEnter = () => {
//     (document.activeElement as HTMLElement)?.blur();
//   };

//   const LoadingIndicatorProgress = customizationService.getCustomization(
//     'ui.loadingIndicatorProgress'
//   );

//   useEffect(() => {
//     const handleResize = () => {
//       const wasMobile = isMobile;
//       const nowMobile = window.innerWidth <= 768;

//       if (wasMobile !== nowMobile) {
//         setIsMobile(nowMobile);
//         setLayoutKey(prev => prev + 1);

//         setTimeout(() => {
//           window.dispatchEvent(new Event('resize'));
//         }, 100);
//       }
//     };

//     let resizeTimer;
//     const debouncedResize = () => {
//       clearTimeout(resizeTimer);
//       resizeTimer = setTimeout(handleResize, 150);
//     };

//     window.addEventListener('resize', debouncedResize);
//     return () => {
//       window.removeEventListener('resize', debouncedResize);
//       clearTimeout(resizeTimer);
//     };
//   }, [isMobile]);

//   useEffect(() => {
//     document.body.classList.add('bg-black');
//     document.body.classList.add('overflow-hidden');

//     return () => {
//       document.body.classList.remove('bg-black');
//       document.body.classList.remove('overflow-hidden');
//     };
//   }, []);

//   const getComponent = id => {
//     const entry = extensionManager.getModuleEntry(id);

//     if (!entry || !entry.component) {
//       throw new Error(
//         `${id} is not valid for an extension module or no component found from extension ${id}. Please verify your configuration or ensure that the extension is properly registered. It's also possible that your mode is utilizing a module from an extension that hasn't been included in its dependencies (add the extension to the "extensionDependencies" array in your mode's index.js file). Check the reference string to the extension in your Mode configuration`
//       );
//     }

//     return { entry };
//   };

//   useEffect(() => {
//     const { unsubscribe } = hangingProtocolService.subscribe(
//       HangingProtocolService.EVENTS.PROTOCOL_CHANGED,
//       () => {
//         setShowLoadingIndicator(false);
//       }
//     );

//     return () => {
//       unsubscribe();
//     };
//   }, [hangingProtocolService]);

//   const getViewportComponentData = viewportComponent => {
//     const { entry } = getComponent(viewportComponent.namespace);

//     return {
//       component: entry.component,
//       isReferenceViewable: entry.isReferenceViewable,
//       displaySetsToDisplay: viewportComponent.displaySetsToDisplay,
//     };
//   };

//   useEffect(() => {
//     const { unsubscribe } = panelService.subscribe(
//       panelService.EVENTS.PANELS_CHANGED,
//       ({ options }) => {
//         setHasLeftPanels(hasPanels('left'));
//         setHasRightPanels(hasPanels('right'));
//         if (options?.leftPanelClosed !== undefined) {
//           setLeftPanelClosed(options.leftPanelClosed);
//         }
//         if (options?.rightPanelClosed !== undefined) {
//           setRightPanelClosed(options.rightPanelClosed);
//         }
//       }
//     );

//     return () => {
//       unsubscribe();
//     };
//   }, [panelService, hasPanels]);

//   const viewportComponents = viewports.map(getViewportComponentData);

//   if (isMobile) {
//     return (
//       <div key={`mobile-${layoutKey}`}>
//         <ViewerHeader
//           hotkeysManager={hotkeysManager}
//           extensionManager={extensionManager}
//           servicesManager={servicesManager}
//           appConfig={appConfig}
//         />
//         <div
//           className="relative flex w-full flex-col flex-nowrap items-stretch overflow-hidden bg-black"
//           style={{ height: 'calc(100vh - 52px)' }}
//         >
//           <React.Fragment>
//             {showLoadingIndicator && <LoadingIndicatorProgress className="h-full w-full bg-black" />}
//             <div className="flex h-[calc(100%-180px)] w-full">
//               <ResizablePanelGroup {...resizablePanelGroupProps} key={`mobile-panels-${layoutKey}`}>
//                 <ResizablePanel {...resizableViewportGridPanelProps}>
//                   <div className="flex h-full flex-1 flex-col">
//                   <div
//   className="relative flex h-full flex-1 items-center justify-center overflow-hidden bg-black"
//   onMouseEnter={handleMouseEnter}
//   style={{ paddingLeft: '8px', paddingBottom: '14px' }}
// >
//                       <ViewportGridComp
//                         servicesManager={servicesManager}
//                         viewportComponents={viewportComponents}
//                         commandsManager={commandsManager}
//                       />
//                     </div>
//                   </div>
//                 </ResizablePanel>
//                 {hasRightPanels ? (
//                   <>
//                     <ResizableHandle
//                       onDragging={onHandleDragging}
//                       disabled={!rightPanelResizable}
//                       className={resizableHandleClassName}
//                     />
//                     <ResizablePanel {...resizableRightPanelProps}>
//                       <SidePanelWithServices
//                         side="right"
//                         isExpanded={!rightPanelClosedState}
//                         servicesManager={servicesManager}
//                         {...rightPanelProps}
//                       />
//                     </ResizablePanel>
//                   </>
//                 ) : null}
//               </ResizablePanelGroup>
//             </div>
//             {hasLeftPanels && (
//               <div
//                 className="flex h-[180px] w-full border-t border-black overflow-x-auto overflow-y-hidden items-start pb-2"
//                 style={{
//                   scrollbarWidth: 'thin',
//                   scrollbarColor: '#ff6600 transparent'
//                 }}
//               >
//                 <SidePanelWithServices
//                   side="left"
//                   isExpanded={true}
//                   servicesManager={servicesManager}
//                   expandedWidth={10000}
//                   collapsedWidth={25}
//                   activeTabIndex={0}
//                   onClose={() => {}}
//                   onOpen={() => {}}
//                   className="bottom-panel"
//                   expandedInsideBorderSize={0}
//                   collapsedInsideBorderSize={4}
//                   collapsedOutsideBorderSize={4}
//                 />
//               </div>
//             )}
//           </React.Fragment>
//         </div>
//         <Onboarding tours={customizationService.getCustomization('ohif.tours')} />
//         <InvestigationalUseDialog dialogConfiguration={appConfig?.investigationalUseDialog} />
//       </div>
//     );
//   }

//   return (
//     <div key={`desktop-${layoutKey}`}>
//       <ViewerHeader
//         hotkeysManager={hotkeysManager}
//         extensionManager={extensionManager}
//         servicesManager={servicesManager}
//         appConfig={appConfig}
//       />
//       <div
//         className="relative flex w-full flex-row flex-nowrap items-stretch overflow-hidden bg-black"
//         style={{ height: 'calc(100vh - 52px)' }}
//       >
//         <React.Fragment>
//           {showLoadingIndicator && <LoadingIndicatorProgress className="h-full w-full bg-black" />}
//           <ResizablePanelGroup {...resizablePanelGroupProps} key={`desktop-panels-${layoutKey}`}>
//             {hasLeftPanels ? (
//               <>
//                 <ResizablePanel {...resizableLeftPanelProps}>
//                   <SidePanelWithServices
//                     side="left"
//                     isExpanded={!leftPanelClosedState}
//                     servicesManager={servicesManager}
//                     {...leftPanelProps}
//                   />
//                 </ResizablePanel>
//                 <ResizableHandle
//                   onDragging={onHandleDragging}
//                   disabled={!leftPanelResizable}
//                   className={resizableHandleClassName}
//                 />
//               </>
//             ) : null}
//             <ResizablePanel {...resizableViewportGridPanelProps}>
//               <div className="flex h-full flex-1 flex-col">
//               <div
//   className="relative flex h-full flex-1 items-center justify-center overflow-hidden bg-black"
//   onMouseEnter={handleMouseEnter}
//   style={{ paddingLeft: '8px', paddingBottom: '8px' }}
// >
//                   <ViewportGridComp
//                     servicesManager={servicesManager}
//                     viewportComponents={viewportComponents}
//                     commandsManager={commandsManager}
//                   />
//                 </div>
//               </div>
//             </ResizablePanel>
//             {hasRightPanels ? (
//               <>
//                 <ResizableHandle
//                   onDragging={onHandleDragging}
//                   disabled={!rightPanelResizable}
//                   className={resizableHandleClassName}
//                 />
//                 <ResizablePanel {...resizableRightPanelProps}>
//                   <SidePanelWithServices
//                     side="right"
//                     isExpanded={!rightPanelClosedState}
//                     servicesManager={servicesManager}
//                     {...rightPanelProps}
//                   />
//                 </ResizablePanel>
//               </>
//             ) : null}
//           </ResizablePanelGroup>
//         </React.Fragment>
//       </div>
//       <Onboarding tours={customizationService.getCustomization('ohif.tours')} />
//       <InvestigationalUseDialog dialogConfiguration={appConfig?.investigationalUseDialog} />
//     </div>
//   );
// }

// ViewerLayout.propTypes = {
//   extensionManager: PropTypes.shape({
//     getModuleEntry: PropTypes.func.isRequired,
//   }).isRequired,
//   commandsManager: PropTypes.instanceOf(CommandsManager),
//   servicesManager: PropTypes.object.isRequired,
//   leftPanels: PropTypes.array,
//   rightPanels: PropTypes.array,
//   leftPanelClosed: PropTypes.bool.isRequired,
//   rightPanelClosed: PropTypes.bool.isRequired,
//   children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
//   viewports: PropTypes.array,
// };

// export default ViewerLayout;



//okok
// import React, { useEffect, useState, useCallback } from 'react';
// import PropTypes from 'prop-types';

// import { InvestigationalUseDialog } from '@ohif/ui-next';
// import { HangingProtocolService, CommandsManager } from '@ohif/core';
// import { useAppConfig } from '@state';
// import ViewerHeader from './ViewerHeader';
// import SidePanelWithServices from '../Components/SidePanelWithServices';
// import { Onboarding, ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@ohif/ui-next';
// import useResizablePanels from './ResizablePanelsHook';

// const resizableHandleClassName = 'mt-[1px] bg-black';

// function ViewerLayout({
//   extensionManager,
//   servicesManager,
//   hotkeysManager,
//   commandsManager,
//   viewports,
//   ViewportGridComp,
//   leftPanelClosed = false,
//   rightPanelClosed = false,
//   leftPanelResizable = false,
//   rightPanelResizable = false,
//   leftPanelInitialExpandedWidth,
//   rightPanelInitialExpandedWidth,
//   leftPanelMinimumExpandedWidth,
//   rightPanelMinimumExpandedWidth,
// }: withAppTypes): React.FunctionComponent {
//   const [appConfig] = useAppConfig();

//   const { panelService, hangingProtocolService, customizationService } = servicesManager.services;
//   const [showLoadingIndicator, setShowLoadingIndicator] = useState(appConfig.showLoadingIndicator);

//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const [layoutKey, setLayoutKey] = useState(0);

//   const hasPanels = useCallback(
//     (side): boolean => !!panelService.getPanels(side).length,
//     [panelService]
//   );

//   const [hasRightPanels, setHasRightPanels] = useState(hasPanels('right'));
//   const [hasLeftPanels, setHasLeftPanels] = useState(hasPanels('left'));
//   const [leftPanelClosedState, setLeftPanelClosed] = useState(leftPanelClosed);
//   const [rightPanelClosedState, setRightPanelClosed] = useState(rightPanelClosed);

//   const [
//     leftPanelProps,
//     rightPanelProps,
//     resizablePanelGroupProps,
//     resizableLeftPanelProps,
//     resizableViewportGridPanelProps,
//     resizableRightPanelProps,
//     onHandleDragging,
//   ] = useResizablePanels(
//     leftPanelClosed,
//     setLeftPanelClosed,
//     rightPanelClosed,
//     setRightPanelClosed,
//     hasLeftPanels,
//     hasRightPanels,
//     leftPanelInitialExpandedWidth,
//     rightPanelInitialExpandedWidth,
//     leftPanelMinimumExpandedWidth,
//     rightPanelMinimumExpandedWidth
//   );

//   const handleMouseEnter = () => {
//     (document.activeElement as HTMLElement)?.blur();
//   };
// const [bottomPanelHeight, setBottomPanelHeight] = useState(180);

// useEffect(() => {
// const updateBottomPanelHeight = () => {
//   setBottomPanelHeight(180);
// };

//   if (isMobile) {
//     updateBottomPanelHeight();
//   }
// }, [isMobile, layoutKey]);
//   const LoadingIndicatorProgress = customizationService.getCustomization(
//     'ui.loadingIndicatorProgress'
//   );

//   useEffect(() => {
//     const handleResize = () => {
//       const wasMobile = isMobile;
//       const nowMobile = window.innerWidth <= 768;

//       if (wasMobile !== nowMobile) {
//         setIsMobile(nowMobile);
//         setLayoutKey(prev => prev + 1);

//         setTimeout(() => {
//           window.dispatchEvent(new Event('resize'));
//         }, 100);
//       }
//     };

//     let resizeTimer;
//     const debouncedResize = () => {
//       clearTimeout(resizeTimer);
//       resizeTimer = setTimeout(handleResize, 150);
//     };

//     window.addEventListener('resize', debouncedResize);
//     return () => {
//       window.removeEventListener('resize', debouncedResize);
//       clearTimeout(resizeTimer);
//     };
//   }, [isMobile]);

//   useEffect(() => {
//     document.body.classList.add('bg-black');
//     document.body.classList.add('overflow-hidden');

//     return () => {
//       document.body.classList.remove('bg-black');
//       document.body.classList.remove('overflow-hidden');
//     };
//   }, []);

//   const getComponent = id => {
//     const entry = extensionManager.getModuleEntry(id);

//     if (!entry || !entry.component) {
//       throw new Error(
//         `${id} is not valid for an extension module or no component found from extension ${id}. Please verify your configuration or ensure that the extension is properly registered. It's also possible that your mode is utilizing a module from an extension that hasn't been included in its dependencies (add the extension to the "extensionDependencies" array in your mode's index.js file). Check the reference string to the extension in your Mode configuration`
//       );
//     }

//     return { entry };
//   };

//   useEffect(() => {
//     const { unsubscribe } = hangingProtocolService.subscribe(
//       HangingProtocolService.EVENTS.PROTOCOL_CHANGED,
//       () => {
//         setShowLoadingIndicator(false);
//       }
//     );

//     return () => {
//       unsubscribe();
//     };
//   }, [hangingProtocolService]);

//   const getViewportComponentData = viewportComponent => {
//     const { entry } = getComponent(viewportComponent.namespace);

//     return {
//       component: entry.component,
//       isReferenceViewable: entry.isReferenceViewable,
//       displaySetsToDisplay: viewportComponent.displaySetsToDisplay,
//     };
//   };

//   useEffect(() => {
//     const { unsubscribe } = panelService.subscribe(
//       panelService.EVENTS.PANELS_CHANGED,
//       ({ options }) => {
//         setHasLeftPanels(hasPanels('left'));
//         setHasRightPanels(hasPanels('right'));
//         if (options?.leftPanelClosed !== undefined) {
//           setLeftPanelClosed(options.leftPanelClosed);
//         }
//         if (options?.rightPanelClosed !== undefined) {
//           setRightPanelClosed(options.rightPanelClosed);
//         }
//       }
//     );

//     return () => {
//       unsubscribe();
//     };
//   }, [panelService, hasPanels]);

//   const viewportComponents = viewports.map(getViewportComponentData);

//   if (isMobile) {
//     return (
//       <div key={`mobile-${layoutKey}`}>
//         <ViewerHeader
//           hotkeysManager={hotkeysManager}
//           extensionManager={extensionManager}
//           servicesManager={servicesManager}
//           appConfig={appConfig}
//         />
//         <div
//           className="relative flex w-full flex-col flex-nowrap items-stretch overflow-hidden bg-black"
//          style={{ height: 'calc(100vh - 52px)' }}
//         >
//           <React.Fragment>
//             {showLoadingIndicator && <LoadingIndicatorProgress className="h-full w-full bg-black" />}
//             <div className="flex w-full pl-4" style={{ height: `calc(100% - ${bottomPanelHeight}px)` }}>
//               <ResizablePanelGroup {...resizablePanelGroupProps} key={`mobile-panels-${layoutKey}`}>
//                 <ResizablePanel {...resizableViewportGridPanelProps}>
//                   <div className="flex h-full flex-1 flex-col">
//                     <div
//                       className="relative flex h-full flex-1 items-center justify-center overflow-hidden bg-black"
//                       onMouseEnter={handleMouseEnter}
//                     >
//                       <ViewportGridComp
//                         servicesManager={servicesManager}
//                         viewportComponents={viewportComponents}
//                         commandsManager={commandsManager}
//                       />
//                     </div>
//                   </div>
//                 </ResizablePanel>
//                 {hasRightPanels ? (
//                   <>
//                     <ResizableHandle
//                       onDragging={onHandleDragging}
//                       disabled={!rightPanelResizable}
//                       className={resizableHandleClassName}
//                     />
//                     <ResizablePanel {...resizableRightPanelProps}>
//                       <SidePanelWithServices
//                         side="right"
//                         isExpanded={!rightPanelClosedState}
//                         servicesManager={servicesManager}
//                         {...rightPanelProps}
//                       />
//                     </ResizablePanel>
//                   </>
//                 ) : null}
//               </ResizablePanelGroup>
//             </div>
// {hasLeftPanels && (
//   <div
//     className="flex w-full border-t border-black overflow-x-auto overflow-y-hidden items-start"
//     style={{
//       height: `${bottomPanelHeight}px`,
//       minHeight: '160px',
//       maxHeight: '220px',
//       scrollbarWidth: 'thin',
//       scrollbarColor: '#ff6600 transparent'
//     }}
//   >
//     <SidePanelWithServices
//       side="left"
//       isExpanded={true}
//       servicesManager={servicesManager}
//       expandedWidth={10000}
//       collapsedWidth={25}
//       activeTabIndex={0}
//       onClose={() => {}}
//       onOpen={() => {}}
//       className="bottom-panel"
//       expandedInsideBorderSize={0}
//       collapsedInsideBorderSize={4}
//       collapsedOutsideBorderSize={4}
//     />
//   </div>
// )}
//           </React.Fragment>
//         </div>
//         <Onboarding tours={customizationService.getCustomization('ohif.tours')} />
//         <InvestigationalUseDialog dialogConfiguration={appConfig?.investigationalUseDialog} />
//       </div>
//     );
//   }

//   return (
//     <div key={`desktop-${layoutKey}`}>
//       <ViewerHeader
//         hotkeysManager={hotkeysManager}
//         extensionManager={extensionManager}
//         servicesManager={servicesManager}
//         appConfig={appConfig}
//       />
//       <div
//         className="relative flex w-full flex-row flex-nowrap items-stretch overflow-hidden bg-black"
//         style={{ height: 'calc(100vh - 90px)' }}
//       >
//         <React.Fragment>
//           {showLoadingIndicator && <LoadingIndicatorProgress className="h-full w-full bg-black" />}
//           <ResizablePanelGroup {...resizablePanelGroupProps} key={`desktop-panels-${layoutKey}`}>
//             {hasLeftPanels ? (
//               <>
//                 <ResizablePanel {...resizableLeftPanelProps}>
//                   <SidePanelWithServices
//                     side="left"
//                     isExpanded={!leftPanelClosedState}
//                     servicesManager={servicesManager}
//                     {...leftPanelProps}
//                   />
//                 </ResizablePanel>
//                 <ResizableHandle
//                   onDragging={onHandleDragging}
//                   disabled={!leftPanelResizable}
//                   className={resizableHandleClassName}
//                 />
//               </>
//             ) : null}
//             <ResizablePanel {...resizableViewportGridPanelProps}>
//               <div className="flex h-full flex-1 flex-col">
//                 <div
//                   className="relative flex h-full flex-1 items-center justify-center overflow-hidden bg-black"
//                   onMouseEnter={handleMouseEnter}
//                 >
//                   <ViewportGridComp
//                     servicesManager={servicesManager}
//                     viewportComponents={viewportComponents}
//                     commandsManager={commandsManager}
//                   />
//                 </div>
//               </div>
//             </ResizablePanel>
//             {hasRightPanels ? (
//               <>
//                 <ResizableHandle
//                   onDragging={onHandleDragging}
//                   disabled={!rightPanelResizable}
//                   className={resizableHandleClassName}
//                 />
//                 <ResizablePanel {...resizableRightPanelProps}>
//                   <SidePanelWithServices
//                     side="right"
//                     isExpanded={!rightPanelClosedState}
//                     servicesManager={servicesManager}
//                     {...rightPanelProps}
//                   />
//                 </ResizablePanel>
//               </>
//             ) : null}
//           </ResizablePanelGroup>
//         </React.Fragment>
//       </div>
//       <Onboarding tours={customizationService.getCustomization('ohif.tours')} />
//       <InvestigationalUseDialog dialogConfiguration={appConfig?.investigationalUseDialog} />
//     </div>
//   );
// }

// ViewerLayout.propTypes = {
//   extensionManager: PropTypes.shape({
//     getModuleEntry: PropTypes.func.isRequired,
//   }).isRequired,
//   commandsManager: PropTypes.instanceOf(CommandsManager),
//   servicesManager: PropTypes.object.isRequired,
//   leftPanels: PropTypes.array,
//   rightPanels: PropTypes.array,
//   leftPanelClosed: PropTypes.bool.isRequired,
//   rightPanelClosed: PropTypes.bool.isRequired,
//   children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
//   viewports: PropTypes.array,
// };

// export default ViewerLayout;










import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { InvestigationalUseDialog } from '@ohif/ui-next';
import { HangingProtocolService, CommandsManager } from '@ohif/core';
import { useAppConfig } from '@state';
import ViewerHeader from './ViewerHeader';
import SidePanelWithServices from '../Components/SidePanelWithServices';
import { Onboarding, ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@ohif/ui-next';
import useResizablePanels from './ResizablePanelsHook';


const resizableHandleClassName = 'mt-[1px] bg-black';
const HEADER_HEIGHT = 90;
const MOBILE_FOOTER_HEIGHT = 160;

function ViewerLayout({
  extensionManager,
  servicesManager,
  hotkeysManager,
  commandsManager,
  viewports,
  ViewportGridComp,
  leftPanelClosed = false,
  rightPanelClosed = false,
  leftPanelResizable = false,
  rightPanelResizable = false,
  leftPanelInitialExpandedWidth,
  rightPanelInitialExpandedWidth,
  leftPanelMinimumExpandedWidth,
  rightPanelMinimumExpandedWidth,
}: withAppTypes): React.FunctionComponent {
  const [appConfig] = useAppConfig();

  const { panelService, hangingProtocolService, customizationService } = servicesManager.services;
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(appConfig.showLoadingIndicator);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [layoutKey, setLayoutKey] = useState(0);
  const [isLandscape, setIsLandscape] = useState(false);

  const hasPanels = useCallback(
    (side): boolean => !!panelService.getPanels(side).length,
    [panelService]
  );

  const [hasRightPanels, setHasRightPanels] = useState(hasPanels('right'));
  const [hasLeftPanels, setHasLeftPanels] = useState(hasPanels('left'));
  const [leftPanelClosedState, setLeftPanelClosed] = useState(leftPanelClosed);
  const [rightPanelClosedState, setRightPanelClosed] = useState(rightPanelClosed);

  const [
    leftPanelProps,
    rightPanelProps,
    resizablePanelGroupProps,
    resizableLeftPanelProps,
    resizableViewportGridPanelProps,
    resizableRightPanelProps,
    onHandleDragging,
  ] = useResizablePanels(
    leftPanelClosed,
    setLeftPanelClosed,
    rightPanelClosed,
    setRightPanelClosed,
    hasLeftPanels,
    hasRightPanels,
    leftPanelInitialExpandedWidth,
    rightPanelInitialExpandedWidth,
    leftPanelMinimumExpandedWidth,
    rightPanelMinimumExpandedWidth
  );

  const handleMouseEnter = () => {
    (document.activeElement as HTMLElement)?.blur();
  };

  const LoadingIndicatorProgress = customizationService.getCustomization(
    'ui.loadingIndicatorProgress'
  );

  useEffect(() => {
    const handleResize = () => {
      const wasMobile = isMobile;
      const nowMobile = window.innerWidth <= 768;

      if (wasMobile !== nowMobile) {
        setIsMobile(nowMobile);
        setLayoutKey(prev => prev + 1);

        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 100);
      }
    };

    let resizeTimer;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, [isMobile]);

  useEffect(() => {
    document.body.classList.add('bg-black');
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('bg-black');
      document.body.classList.remove('overflow-hidden');
    };
  }, []);
//   useEffect(() => {
//   if (!isMobile) return;

//   const handleOrientationChange = () => {
//     const landscape = window.innerHeight < window.innerWidth;
//     setIsLandscape(landscape);
//   };

//   handleOrientationChange();
//   window.addEventListener('resize', handleOrientationChange);
//   window.addEventListener('orientationchange', handleOrientationChange);

//   return () => {
//     window.removeEventListener('resize', handleOrientationChange);
//     window.removeEventListener('orientationchange', handleOrientationChange);
//   };
// }, [isMobile]);
useEffect(() => {
  if (!isMobile) return;

  const handleOrientationChange = () => {
    const landscape = window.innerHeight < window.innerWidth;
    const wasLandscape = isLandscape;

    setIsLandscape(landscape);

    if (wasLandscape && !landscape) {
      setLayoutKey(prev => prev + 1);
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    }
  };

  handleOrientationChange();
  window.addEventListener('resize', handleOrientationChange);
  window.addEventListener('orientationchange', handleOrientationChange);

  return () => {
    window.removeEventListener('resize', handleOrientationChange);
    window.removeEventListener('orientationchange', handleOrientationChange);
  };
}, [isMobile, isLandscape]);

  const getComponent = id => {
    const entry = extensionManager.getModuleEntry(id);

    if (!entry || !entry.component) {
      throw new Error(
        `${id} is not valid for an extension module or no component found from extension ${id}. Please verify your configuration or ensure that the extension is properly registered. It's also possible that your mode is utilizing a module from an extension that hasn't been included in its dependencies (add the extension to the "extensionDependencies" array in your mode's index.js file). Check the reference string to the extension in your Mode configuration`
      );
    }

    return { entry };
  };

  useEffect(() => {
    const { unsubscribe } = hangingProtocolService.subscribe(
      HangingProtocolService.EVENTS.PROTOCOL_CHANGED,
      () => {
        setShowLoadingIndicator(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [hangingProtocolService]);

  const getViewportComponentData = viewportComponent => {
    const { entry } = getComponent(viewportComponent.namespace);

    return {
      component: entry.component,
      isReferenceViewable: entry.isReferenceViewable,
      displaySetsToDisplay: viewportComponent.displaySetsToDisplay,
    };
  };

  useEffect(() => {
    const { unsubscribe } = panelService.subscribe(
      panelService.EVENTS.PANELS_CHANGED,
      ({ options }) => {
        setHasLeftPanels(hasPanels('left'));
        setHasRightPanels(hasPanels('right'));
        if (options?.leftPanelClosed !== undefined) {
          setLeftPanelClosed(options.leftPanelClosed);
        }
        if (options?.rightPanelClosed !== undefined) {
          setRightPanelClosed(options.rightPanelClosed);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [panelService, hasPanels]);

  const viewportComponents = viewports.map(getViewportComponentData);

  if (isMobile) {
    if (isLandscape) {
  return (
    <div key={`mobile-landscape-${layoutKey}`} className="fixed inset-0 bg-black overflow-hidden">
      <div className="h-full w-full">
        <ViewportGridComp
          servicesManager={servicesManager}
          viewportComponents={viewportComponents}
          commandsManager={commandsManager}
        />
      </div>
    </div>
  );
}
    return (
      <div key={`mobile-${layoutKey}`} className="fixed inset-0 flex flex-col bg-black overflow-hidden">
        <div className="flex-shrink-0" style={{ height: `${HEADER_HEIGHT}px` }}>
          <ViewerHeader
            hotkeysManager={hotkeysManager}
            extensionManager={extensionManager}
            servicesManager={servicesManager}
            appConfig={appConfig}
          />
        </div>

        <div
          className="flex-1 relative flex flex-col overflow-hidden"
          style={{ height: `calc(100vh - ${HEADER_HEIGHT + MOBILE_FOOTER_HEIGHT}px)` }}
        >
          {/* {showLoadingIndicator && <LoadingIndicatorProgress className="absolute inset-0 bg-black" />} */}

          <ResizablePanelGroup {...resizablePanelGroupProps} key={`mobile-panels-${layoutKey}`}>
            <ResizablePanel {...resizableViewportGridPanelProps}>
              <div className="flex h-full w-full flex-col">
                <div
                  className="relative flex h-full flex-1 items-center justify-center overflow-hidden bg-black"
                  onMouseEnter={handleMouseEnter}
                >
                  <ViewportGridComp
                    servicesManager={servicesManager}
                    viewportComponents={viewportComponents}
                    commandsManager={commandsManager}
                  />
                </div>
              </div>
            </ResizablePanel>
{/*
            {hasRightPanels ? (
              <>
                <ResizableHandle
                  onDragging={onHandleDragging}
                  disabled={!rightPanelResizable}
                  className={resizableHandleClassName}
                />
                <ResizablePanel {...resizableRightPanelProps}>
                  <SidePanelWithServices
                    side="right"
                    isExpanded={!rightPanelClosedState}
                    servicesManager={servicesManager}
                    {...rightPanelProps}
                  />
                </ResizablePanel>
              </>
            ) : null} */}
          </ResizablePanelGroup>
        </div>

        {hasLeftPanels && (
          <div
            className="fixed bottom-0 left-0 right-0 flex-shrink-0 bg-black border-t-2 border-primary overflow-hidden"
            style={{ height: `${MOBILE_FOOTER_HEIGHT}px` }}
          >
            <div
              className="h-full w-full overflow-x-auto overflow-y-hidden"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#5acce6 #000000',
              }}
            >
              <SidePanelWithServices
                side="left"
                isExpanded={true}
                servicesManager={servicesManager}
                expandedWidth={10000}
                collapsedWidth={25}
                activeTabIndex={0}
                onClose={() => {}}
                onOpen={() => {}}
                className="bottom-panel"
                expandedInsideBorderSize={0}
                collapsedInsideBorderSize={0}
                collapsedOutsideBorderSize={0}
              />
            </div>
          </div>
        )}

        <Onboarding tours={customizationService.getCustomization('ohif.tours')} />
        <InvestigationalUseDialog dialogConfiguration={appConfig?.investigationalUseDialog} />
      </div>
    );
  }

  return (
    <div key={`desktop-${layoutKey}`} className="fixed inset-0 flex flex-col bg-black overflow-hidden">
      <div className="flex-shrink-0" style={{ height: `${HEADER_HEIGHT}px` }}>
        <ViewerHeader
          hotkeysManager={hotkeysManager}
          extensionManager={extensionManager}
          servicesManager={servicesManager}
          appConfig={appConfig}
        />
      </div>

      <div
        className="flex-1 relative flex flex-row overflow-hidden"
        style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      >
        {showLoadingIndicator && <LoadingIndicatorProgress className="absolute inset-0 bg-black" />}

        <ResizablePanelGroup {...resizablePanelGroupProps} key={`desktop-panels-${layoutKey}`}>
          {hasLeftPanels ? (
            <>
              <ResizablePanel {...resizableLeftPanelProps}>
                <SidePanelWithServices
                  side="left"
                  isExpanded={!leftPanelClosedState}
                  servicesManager={servicesManager}
                  {...leftPanelProps}
                />
              </ResizablePanel>
              <ResizableHandle
                onDragging={onHandleDragging}
                disabled={!leftPanelResizable}
                className={resizableHandleClassName}
              />
            </>
          ) : null}

          <ResizablePanel {...resizableViewportGridPanelProps}>
            <div className="flex h-full flex-1 flex-col">
              <div
                className="relative flex h-full flex-1 items-center justify-center overflow-hidden bg-black"
                onMouseEnter={handleMouseEnter}
              >
                <ViewportGridComp
                  servicesManager={servicesManager}
                  viewportComponents={viewportComponents}
                  commandsManager={commandsManager}
                />
              </div>
            </div>
          </ResizablePanel>

          {hasRightPanels ? (
            <>
              <ResizableHandle
                onDragging={onHandleDragging}
                disabled={!rightPanelResizable}
                className={resizableHandleClassName}
              />
              <ResizablePanel {...resizableRightPanelProps}>
                <SidePanelWithServices
                  side="right"
                  isExpanded={!rightPanelClosedState}
                  servicesManager={servicesManager}
                  {...rightPanelProps}
                />
              </ResizablePanel>
            </>
          ) : null}
        </ResizablePanelGroup>
      </div>

      <Onboarding tours={customizationService.getCustomization('ohif.tours')} />
      <InvestigationalUseDialog dialogConfiguration={appConfig?.investigationalUseDialog} />
    </div>
  );
}

ViewerLayout.propTypes = {
  extensionManager: PropTypes.shape({
    getModuleEntry: PropTypes.func.isRequired,
  }).isRequired,
  commandsManager: PropTypes.instanceOf(CommandsManager),
  servicesManager: PropTypes.object.isRequired,
  leftPanels: PropTypes.array,
  rightPanels: PropTypes.array,
  leftPanelClosed: PropTypes.bool.isRequired,
  rightPanelClosed: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  viewports: PropTypes.array,
};

export default ViewerLayout;
