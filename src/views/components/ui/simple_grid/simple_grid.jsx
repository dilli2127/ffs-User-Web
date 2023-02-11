import React from "react";
import { Box, VStack, HStack, useBreakpointValue } from "native-base";
//width mandatory
//columns,spacingX
//columns, itemWidth
//itemWidth,minSpacing
const SimpleGrid = (props) => {
  const children = React.Children.map(props.children, (child, index) => {
    if (React.isValidElement(child)) {
      let clonedChild = React.cloneElement(child, {
        ...child.props,
        _group: props._group,
        key: index,
      });
      return clonedChild;
    }
    return child;
  });
  let parentWidth = props.width;
  const _columns = useBreakpointValue(props.columns);
  let itemWidth = 0;
  let spacingX = 0;
  let spacingSideX = 0;
  let spacingY = 0;
  let columns = 0;
  if (!props.columns) {
    itemWidth = useBreakpointValue(props.itemWidth);
    let minSpacing = useBreakpointValue(props.minSpacing);
    let allowedPerRow = Math.floor(
      (parentWidth - minSpacing) / (itemWidth + minSpacing)
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
    let totalSpacingX = (props.spacingX || 0) * (_columns + 2);
    let _itemWidth = (parentWidth - totalSpacingX) / _columns;
    itemWidth = _itemWidth;
    columns = _columns;
    spacingX = props.spacingX || 0;
    spacingSideX = props.spacingX || 0;
    spacingY = props.spacingY ? props.spacingY : props.spacingX || 0;
    let freeSpacingX =
      parentWidth - (props.spacingX * (_columns + 1) + _itemWidth * _columns);
    if (freeSpacingX > 0) {
      spacingSideX = props.spacingX + freeSpacingX / 2;
    }
  } else {
    itemWidth = useBreakpointValue(props.itemWidth);
    let totalItemWidth = itemWidth * _columns;
    let _spacingX = Math.floor((parentWidth - totalItemWidth) / (_columns + 1));
    spacingX = _spacingX;
    spacingSideX = _spacingX;
    spacingY = props.spacingY || _spacingX;
    columns = _columns;
    let freeSpacingX =
      parentWidth - (_spacingX * (_columns + 1) + itemWidth * _columns);
    if (freeSpacingX > 0) {
      spacingSideX = _spacingX + freeSpacingX / 2;
    }
  }
  let totalItems = children?.length || 1;
  let rowItems = [];
  let rowLength = Math.ceil(children?.length / columns);
  let itemIndex = 0;
  for (let r = 0; r < rowLength; r++) {
    let columnItems = [];
    for (let c = 0; c < columns; c++) {
      columnItems.push(children[itemIndex]);
      itemIndex++;
    }
    rowItems.push(columnItems);
  }
  return (
    <VStack width={props.width} space={0} justifyContent="flex-start">
      {rowItems.map((columnItems, rowIndex) => (
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
                  width={`${itemWidth}px`}
                >
                  {child}
                </Box>
              </React.Fragment>
            ))}
          </HStack>
          {rowItems.length - 1 === rowIndex && (
            <Box
              key={`spacing-lastrow-${rowIndex}`}
              width={`${itemWidth}px`}
              height={`${spacingY}px`}
            ></Box>
          )}
        </React.Fragment>
      ))}
    </VStack>
  );
};
export default SimpleGrid;
