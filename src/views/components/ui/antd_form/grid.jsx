import React, { useRef, useEffect, useState } from "react";
import { Box, VStack, HStack, useBreakpointValue } from "native-base";

const Grid = (props) => {
  const parentRef = useRef(null);
  const [parentHeight, setParentHeight] = useState(null);
  const [parentWidth, setParentWidth] = useState(null);
  useEffect(() => {
    if (parentRef.current) {
      setParentHeight(parentRef.current.offsetHeight);
      setParentWidth(parentRef.current.offsetWidth);
    }
  }, [parentRef]);
  let children = [];
  let props_children = props?.children;
  if (
    typeof props?.children === "object" &&
    !Array.isArray(props?.children) &&
    props?.children !== null
  ) {
    props_children = [props?.children];
  }
  for (let c = 0; c < props_children?.length; c++) {
    let child = props_children[c];
    if (React.isValidElement(child)) {
      let clonedChild = React.cloneElement(child, {
        ...child.props,
        _group: props._group,
        key: c,
      });
      children.push(clonedChild);
    }
  }
  const _columns = useBreakpointValue(props.columns);
  let itemWidth = 0;
  let spacingX = 0;
  let spacingSideX = 0;
  let spacingY = 0;
  let columns = 0;
  if (!props.columns) {
    itemWidth = props.itemWidth;
    let allowedPerRow = Math.floor(
      (parentWidth - props.minSpacing) / (itemWidth + props.minSpacing)
    );
    let totalItemWidth = itemWidth * allowedPerRow;
    let _spacing = Math.floor(
      (parentWidth - totalItemWidth) / (allowedPerRow + 1)
    );
    spacingX = _spacing;
    spacingSideX = _spacing;
    spacingY = _spacing;
    columns = allowedPerRow;
    let freeSpacingX =
      parentWidth - (_spacing * (allowedPerRow + 1) + totalItemWidth);
    if (freeSpacingX > 0) {
      spacingSideX = _spacing + freeSpacingX / 2;
    }
  } else if (!props.itemWidth) {
    let totalSpacingX =
      (useBreakpointValue(props.spacingX) || 0) * (_columns + 1);
    let _itemWidth = (parentWidth - totalSpacingX) / _columns;
    itemWidth = _itemWidth;
    columns = _columns;
    spacingX = useBreakpointValue(props.spacingX) || 0;
    spacingSideX = useBreakpointValue(props.spacingX) || 0;
    spacingY = useBreakpointValue(props.spacingY) || 20;

    let freeSpacingX =
      parentWidth -
      ((useBreakpointValue(props.spacingX) || 0) * (_columns + 1) +
        _itemWidth * _columns);
    if (freeSpacingX > 0) {
      spacingSideX =
        (useBreakpointValue(props.spacingX) || 0) + freeSpacingX / 2;
    }
  } else {
    itemWidth = props.itemWidth;
    let totalItemWidth = itemWidth * _columns;
    let _spacingX = Math.floor((parentWidth - totalItemWidth) / (_columns + 1));
    spacingX = _spacingX;
    spacingSideX = _spacingX;
    spacingY = useBreakpointValue(props.spacingY) || _spacingX;
    columns = _columns;

    let freeSpacingX =
      parentWidth - (_spacingX * (_columns + 1) + itemWidth * _columns);
    if (freeSpacingX > 0) {
      spacingSideX = _spacingX + freeSpacingX / 2;
    }
    if (props.sideSpacing) {
      spacingSideX = props.sideSpacing;
    }
    if (useBreakpointValue(props.spacingX)) {
      spacingX = useBreakpointValue(props.spacingX);
    }
  }
  let totalItems = children.length || 1;

  let rowItems = [];
  let columnItems = [];
  let footerColumnsItems = [];
  let remainingCols = columns;
  for (let c = 0; c < totalItems; c++) {
    let boxspan = children[c]?.props?.boxspan || 1;
    let isFooterColumn = children[c]?.props?.space ? true : false;
    remainingCols = remainingCols - boxspan;
    if (!isFooterColumn) {
      if (remainingCols === 0) {
        remainingCols = columns;
        columnItems.push(children[c]);
        rowItems.push(columnItems);
        columnItems = [];
      } else if (remainingCols < 0) {
        remainingCols = columns;
        rowItems.push(columnItems);
        columnItems = [];
        columnItems.push(children[c]);
        rowItems.push(columnItems);
        columnItems = [];
      } else {
        columnItems.push(children[c]);
      }
    } else {
      footerColumnsItems.push(children[c]);
    }
    if (c === totalItems - 1 && columnItems.length > 0) {
      rowItems.push(columnItems);
    }
  }
  return (
    <VStack space={0} justifyContent="flex-start" ref={parentRef}>
      {parentWidth &&
        rowItems.map((columnItems, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            <Box
              key={`spacing-row-${rowIndex}`}
              width={`${itemWidth}px`}
              height={`${spacingY}px`}
            ></Box>
            <HStack
              key={`content-row-${rowIndex}`}
              space={0}
              justifyContent="flex-start"
              zIndex={totalItems - rowIndex + 2}
            >
              {columnItems.map((child, colIndex) => (
                <React.Fragment key={`row-${rowIndex}-column-${colIndex}`}>
                  <Box
                    key={`spacing-row-${rowIndex}-column-${colIndex}`}
                    width={`${colIndex === 0 ? spacingSideX : spacingX}px`}
                  ></Box>
                  <Box
                    key={`content-row-${rowIndex}-column-${colIndex}`}
                    width={`${
                      itemWidth *
                      ((child?.props?.boxspan || 1) >=
                      (child?.props?.colspan || 1)
                        ? child?.props?.colspan || 1
                        : child?.props?.boxspan || 1)
                    }px`}
                  >
                    {child}
                  </Box>
                </React.Fragment>
              ))}
            </HStack>
            {/* {rowItems.length - 1 === rowIndex && (
              <Box
                key={`spacing-lastrow-${rowIndex}`}
                width={`${itemWidth}px`}
                height={`${spacingY}px`}
              ></Box>
            )} */}
          </React.Fragment>
        ))}
      {footerColumnsItems && (
        <React.Fragment key={`row-footer`}>
          <Box
            key={`spacing-row-footer`}
            // width={`${itemWidth}px`}
            height={`${spacingY}px`}
          ></Box>
          {footerColumnsItems}
        </React.Fragment>
      )}
    </VStack>
  );
};

export default Grid;
