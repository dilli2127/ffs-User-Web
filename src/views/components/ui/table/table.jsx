import React, { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  HStack,
  VStack,
  Skeleton,
  Center,
  Pressable,
  Text,
  Button,
  useBreakpointValue,
} from "native-base";
import { useTranslation } from "react-i18next";
import RcTable from "rc-table";
import RCPagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import lodash from "lodash";
import debounce from "lodash/debounce";
import ReactSelect from "react-select";
import { FcFilledFilter } from "react-icons/fc";
import SearchBox from "@views/components/ui/search_box";
import { set_list_query, listQueriesSelector } from "@services/redux";
import { useIsRTL } from "@helpers/locales";

import ArrowNext from "@views/components/ui/svg/arrow_next";
import ArrowPrev from "@views/components/ui/svg/arrow_prev";

import Title from "./title";
import TitleWithSort from "./title_with_sort";
import ActionTitle from "./action_title";
import { useHistory, useParams } from "react-router-dom";
import ActionButton from "./action_button";
import ActionIconButton from "./action_icon_button";
// import Loading from "../loader/loading";
const Table = (props) => {
  const { t } = useTranslation();

  let submitButtonRef = useRef("");
  const dispatch = useDispatch();
  const showExtendedPagination = useBreakpointValue({
    base: true,
    xs: false,
    sm: false,
    md: true,
  });
  const overflowStyle = useBreakpointValue({
    base: "hidden",
    xs: "scroll",
    sm: "scroll",
    md: "hidden",
  });
  let parentWidth = props.width;

  let [buttonZIndex, setButtonZIndex] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastCount, setLastCount] = useState(0);
  const [loadingItems, setLoadingItems] = useState([]);
  const [initialFilterValues, setInitialFilterValues] = useState(null);
  const [filterValues, setFilterValues] = useState({});
  const { alignLeft, alignRight } = useIsRTL();
  const { list_queries, update_ref } = useSelector(listQueriesSelector);
  let list_query = list_queries.find((x) => x.group === props.group);
  const listQueryRef = useRef(null);
  let columns = [];
  let totalFlexes = 0;
  let totalWidth = 0;

  // const onSelectOpen = () => {
  //   let isOpen = retrieveItem(`select_open`);
  //   setButtonZIndex(isOpen ? -1 : 1);
  // };
  // useEventListener(`select_open`, onSelectOpen, window);

  for (let i = 0; i < props.columns.length; i++) {
    let column = props.columns[i];
    if (!column.flex && !column.width) {
      totalFlexes = totalFlexes + 1;
    } else if (column.width) {
      totalWidth = totalWidth + column.width;
    } else if (column.flex) {
      totalFlexes = totalFlexes + column.flex;
    }
  }
  for (let i = 0; i < props.columns.length; i++) {
    let column = props.columns[i];
    let options = [];
    if (column.type === "select" && column.options) {
      for (let i = 0; i < column.options.length; i++) {
        let option = column.options[i];
        var newObj = {};
        newObj["value"] = lodash.get(option, column.valueField || "id", null);
        newObj["label"] = lodash.get(option, column.labelField || "name", null);
        options.push(newObj);
      }
    }
    let columnWidth = column.width;
    if (!columnWidth) {
      columnWidth = (column.flex / totalFlexes) * (parentWidth - totalWidth);
    }
    let _column = {
      title: column.sortable ? (
        <TitleWithSort
          title={column.header}
          sortOrder={list_query?.query?.sort_order}
          isActive={list_query?.query?.sort_column === column.key}
          headerColor={props.headerColor || "white"}
        />
      ) : column.key === "actions" ? (
        <ActionTitle
          title={column.header}
          headerColor={props.headerColor || "white"}
        />
      ) : (
        <Title
          title={column.header}
          headerColor={props.headerColor || "white"}
        />
      ),
      key: column.key,
      width: columnWidth,
      align:
        column.align === "center"
          ? "center"
          : column.align === "right"
          ? alignRight
          : alignLeft,
      onHeaderCell: column.sortable ? () => onHeaderClick(column.key) : null,
      render: (record) => {
        if (column.type === "actions") {
          return (
            <HStack space={3} justifyContent="center">
              {column.actions.map((action, index) => (
                <Box
                  key={`${record[props.rowKey]}-action-${index}`}
                  style={{ float: "left", width: action.iconSize + 10 }}
                >
                  <ActionIconButton
                    icon={action.icon}
                    iconSize={action.iconSize}
                    iconColor={action.iconColor}
                    title={action.title}
                    record={record}
                    onPress={action.onPress}
                  />
                </Box>
              ))}
            </HStack>
          );
        } else if (column.type === "link") {
          let data = lodash.get(record, column.dataIndex, "");
          let display = lodash.get(record, column.displayIndex, "");
          if (column.formatDisplay) {
            display = column.formatDisplay(display);
          }
          return (
            <Box>
              <Link href={`${column.baseUrl}${data}`}>{display}</Link>
            </Box>
          );
        } else if (column.type === "modal") {
          let data = lodash.get(record, column.dataIndex, "");
          let display = lodash.get(
            record,
            column.labelField,
            column.label || ""
          );
          return (
            <Box>
              <Pressable
                onPress={() => {
                  if (props.onModalOpen) {
                    props.onModalOpen(data, column.dataIndex);
                  }
                }}
              >
                <Text
                  style={{
                    textDecoration: "underline",
                    color: "#7171f5",
                  }}
                >
                  {display}
                </Text>
              </Pressable>
            </Box>
          );
        } else if (column.type === "select") {
          let data = lodash.get(record, column.dataIndex, "");
          let record_id = lodash.get(record, props.idField || "id", "");
          let selected = options.find((x) => x.value === data) || null;

          return (
            <Center w="100%" minH="50px">
              <Box w="100%" h="80%">
                <ReactSelect
                  style={{
                    height: "40px",
                    fontSize: "12px",
                  }}
                  className="basic-single"
                  classNamePrefix="table-select"
                  placeholder=""
                  menuPortalTarget={document.body}
                  // menuIsOpen={isFocused}
                  defaultValue={selected}
                  options={options}
                  onChange={(entity, Object) => {
                    let selectedValue = entity ? entity.value : null;
                    if (props.onSelectChange) {
                      props.onSelectChange(
                        record_id,
                        column.dataIndex,
                        selectedValue
                      );
                    }
                  }}
                />
              </Box>
            </Center>
          );
        } else {
          if (Array.isArray(column.dataIndex)) {
            return (
              <Box>
                <VStack>
                  {column.dataIndex?.map((dataIndex, i) => {
                    let _value = lodash.get(record, dataIndex, "");
                    return (
                      <Box
                        key={i}
                        _text={{ fontWeight: i === 0 ? "bold" : "" }}
                      >
                        {_value}
                      </Box>
                    );
                  })}
                </VStack>
              </Box>
            );
          } else {
            let _value;
            if (column.dataIndex)
              _value = lodash.get(record, column.dataIndex, "");
            else _value = record;
            if (column.formatDisplay) {
              _value = column.formatDisplay(_value);
            }
            return <Box>{_value}</Box>;
          }
        }
      },
    };
    columns.push(_column);
  }
  useEffect(() => {
    setLastCount(props.Data?.length || 0);
  }, [props.data]);

  useEffect(() => {
    if (props.initialFilter && !initialFilterValues) {
      setInitialFilterValues(props.initialFilter);
    }
  }, [props.initialFilter]);

  useEffect(() => {
    let _list_query = list_queries.find((x) => x.group === props.group);
    let query = {
      search_string: _list_query?.query?.search_string || "",
      sort_column: _list_query?.query?.sort_column || "",
      sort_order: _list_query?.query?.sort_order || "desc",
      has_pagination: props.hasPagination,
      page_number: 1,
      page_limit: _list_query?.query?.page_limit || 10,
    };
    if (props.query) {
      query = {
        ...query,
        ...props.query,
      };
    }
    dispatch(set_list_query(props.group, "query", query));
  }, [props.query]);

  useEffect(() => {
    listQueryRef.current = list_query;
  }, [update_ref]);

  useEffect(() => {
    let _loadingItems = [];
    for (let i = 0; i < lastCount; i++) {
      _loadingItems.push(i);
    }
    setLoadingItems(_loadingItems);
  }, [lastCount]);

  useEffect(() => {
    if (list_query && props.fetch) {
      dispatch(props.fetch(list_query.query));
    }
  }, [list_query?.update_ref]);

  const onHeaderClick = (value) => ({
    onClick: () => {
      debouncedHeaderClick(value);
    },
  });

  const debouncedHeaderClick = useMemo(
    () =>
      debounce((value) => {
        let query = {
          ...listQueryRef.current.query,
          sort_column: value,
          sort_order:
            listQueryRef.current.query.sort_order === "desc" ? "asc" : "desc",
        };
        dispatch(set_list_query(props.group, "query", query));
      }, 50),
    []
  );

  const handlePagination = (current) => {
    let query = {
      ...listQueryRef.current.query,
      page_number: current,
    };
    dispatch(set_list_query(props.group, "query", query));
  };
  const handlePageLimit = (option) => {
    let query = {
      ...listQueryRef.current.query,
      page_limit: option.value,
    };
    dispatch(set_list_query(props.group, "query", query));
  };
  const handleSearch = (search_txt) => {
    let query = {
      ...listQueryRef.current.query,
      search_string: search_txt,
    };
    dispatch(set_list_query(props.group, "query", query));
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const onDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const onFilterReset = () => {
    setFilterValues(props.initialFilter);
    handleFilterSubmit(props.initialFilter);
  };

  const onFilterChange = (values) => {
    setFilterValues(values);
  };

  const handleFilterSubmit = (_filterValues) => {
    let query = {
      ...listQueryRef.current.query,
      ..._filterValues,
    };
    setInitialFilterValues(_filterValues);
    dispatch(set_list_query(props.group, "query", query));
  };

  const page_options = [
    { value: 2, label: 2 },
    { value: 10, label: 10 },
    { value: 20, label: 20 },
    { value: 50, label: 50 },
    { value: 100, label: 100 },
  ];
  const default_page_option =
    page_options.find((x) => x.value === list_query?.query?.page_limit) ||
    page_options[0];
  const formatTrProps = (state = {}) => {
    if (props.onRowClick)
      return {
        onClick: () =>
          history.push({
            pathname: `${props.onRowClick}/${state.id}`,
          }),
      };
  };
  return (
    <Box flex="1" w="100%">
      {(props.headerActions || props.hasSearch) && (
        <Box w="100%" height="60px" position="relative">
          <HStack space={3} justifyContent="flex-end">
            {props.headerActions?.map((headerAction, index) => (
              <Box key={`header-action-${index}`}>
                <ActionButton {...headerAction} />
              </Box>
            ))}
            {props.hasSearch && (
              <SearchBox
                label={t("table:search")}
                width={{
                  base: "300px",
                  xs: "200px",
                  sm: "200px",
                  md: "300px",
                }}
                onSearch={handleSearch}
              />
            )}
            {props.hasFilter && (
              <Center>
                <Pressable
                  onPress={() => {
                    setIsDrawerOpen(isDrawerOpen ? false : true);
                  }}
                >
                  <FcFilledFilter size={40} />
                </Pressable>
              </Center>
            )}
          </HStack>
        </Box>
      )}
      <Box w="100%" position="relative" overflow={overflowStyle}>
        <RcTable
          flex={1}
          columns={columns}
          data={props.loading ? [] : props.data}
          rowKey={props.rowKey}
          onRow={(state) => formatTrProps(state)}
          emptyText={null}
        />
        {props.loading && (
          <Box w="100%" position="absolute" top="47px">
            <VStack w="100%" borderWidth="0" space={"2px"} overflow="hidden">
              {/* <Loading /> */}
            </VStack>
          </Box>
        )}
        {!props.loading && (!props.data || props.data.length === 0) && (
          <>
            <Center mt="">
              <img
                src="https://nrtdata-assets.s3.ap-south-1.amazonaws.com/no_data.gif"
                width="200"
              />
            </Center>
            <Center _text={{ fontSize: "30px", color: "lightgrey" }}>
              {props.emptyMessage || ""}
            </Center>
          </>
        )}
      </Box>
      {!props.loading &&
        props.hasPagination &&
        props.data &&
        props.data.length > 0 && (
          <Box
            flex={1}
            flexDirection="row"
            justifyContent="flex-end"
            marginTop="10px"
          >
            {showExtendedPagination && (
              <Box
                flex={1}
                flexDirection="row"
                justifyContent="flex-start"
                marginTop="5px"
              >
                <Dropdown
                  width="100px"
                  options={page_options}
                  value={default_page_option}
                  placeholder=""
                  onChange={handlePageLimit}
                />
                <Box
                  marginLeft="10px"
                  marginTop="7px"
                  _text={{ fontWeight: "medium", fontSize: "14px" }}
                >
                  {t("table:per_page")}
                </Box>
              </Box>
            )}
            <Box
              flex={3}
              flexDirection="row"
              justifyContent="flex-end"
              marginTop="5px"
            >
              <RCPagination
                total={props.totalItems || 0}
                current={list_query?.query?.page_number || 1}
                pageSize={list_query?.query?.page_limit || 10}
                nextIcon={
                  <ArrowNext color="red" style={{ marginTop: "5px" }} />
                }
                prevIcon={
                  <ArrowPrev color="red" style={{ marginTop: "5px" }} />
                }
                onChange={handlePagination}
                showTitle={false}
                showTotal={(total, range) => {
                  if (showExtendedPagination) {
                    return t("table:showing_records", {
                      startRange: range[0],
                      endRange: range[1],
                      total: total,
                    });
                  }
                }}
              />
            </Box>
          </Box>
        )}
    </Box>
  );
};
export default Table;
