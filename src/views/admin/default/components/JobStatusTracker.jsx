import {
  Avatar,
  Box,
  Checkbox,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import PropTypes from 'prop-types';
import { useMemo } from 'react';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import { CheckCircleIcon } from 'assets/humanIcons';
import { Card } from 'components/index';
import Menu from 'components/themedV2/menu/MainMenu';
import useMode from 'hooks/useMode';
// const { CheckCircleIcon } = icons;

const JobStatusTracker = ({ tableData }) => {
  const columns = useMemo(() => tableData.columns, [tableData.columns]);
  const data = useMemo(() => tableData.data, [tableData.data]);
  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const { theme, colorModeValues } = useMode();
  const textColor = colorModeValues('secondaryGray.900', 'white');
  const borderColor = colorModeValues('gray.200', 'whiteAlpha.100');

  const renderCellData = cell => {
    const { Header } = cell.column;
    const value = cell.value;
    if (Header === 'COMPANY NAME') {
      return (
        <Box display="flex" alignItems="center" flexGrow={1}>
          <Checkbox defaultChecked={value[1]} color="primary" />
          <Typography color={textColor} fontWeight="700">
            {value[0]}
          </Typography>
        </Box>
      );
    } else if (Header === 'APPLICATION DATA') {
      return (
        <Box display="flex" flexDirection="column" flexGrow={1}>
          {value.map((data, idx) => (
            <Box
              key={idx}
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              mb={1}
              flexGrow={1}
            >
              <Avatar sx={{ mr: 1 }}>{data.icon}</Avatar>
              <Typography color={textColor} fontWeight="700">
                {data.text}
              </Typography>
            </Box>
          ))}
        </Box>
      );
    } else if (Header === 'NOTES') {
      return (
        <Box display="flex" alignItems="center">
          <Typography
            variant="body2"
            sx={{
              color: textColor,
              fontWeight: '700',
            }}
          >
            {value}
          </Typography>
        </Box>
      );
    } else if (Header === 'PROGRESS') {
      return (
        <Box display="flex" alignItems="center">
          <LinearProgress
            variant="determinate"
            value={value}
            sx={{ width: '100px', mr: 1 }}
          />
          <Typography sx={{ color: textColor, fontWeight: '700' }}>
            {value}%
          </Typography>
        </Box>
      );
    } else if (Header === 'STATUS') {
      const statusColor =
        value === 'Approved'
          ? 'green'
          : value === 'Disable'
            ? 'red'
            : value === 'Error'
              ? 'orange'
              : 'gray';
      return (
        <Box display="flex" alignItems="center">
          <CheckCircleIcon style={{ color: statusColor }} />
          <Typography sx={{ color: textColor, fontWeight: '700', ml: 1 }}>
            {value}
          </Typography>
        </Box>
      );
    } else {
      return value;
    }
  };

  return (
    <Card
      direction="column"
      width="100%"
      padding="0"
      overflowX="auto"
      mode="dark"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="16px"
      >
        <Typography variant="h6" color={textColor} fontWeight="700">
          Job Application Progress and Status Tracker
        </Typography>
        <Menu />
      </Box>
      <TableContainer component={Paper}>
        <Table {...getTableProps()} aria-label="simple table">
          <TableHead>
            {headerGroups.map((headerGroup, index) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    style={{
                      borderColor: borderColor,
                      padding: '8px',
                      textAlign: 'left',
                      width: `${100 / headerGroup.headers.length}%`,
                    }}
                  >
                    {column.render('Header')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()} key={rowIndex}>
                  {row.cells.map((cell, cellIndex) => (
                    <TableCell
                      {...cell.getCellProps()}
                      key={cellIndex}
                      sx={{
                        borderColor: 'transparent',
                        padding: '8px',
                        textAlign: 'left',
                        width: `${100 / headerGroups[0].headers.length}%`,
                      }}
                    >
                      {renderCellData(cell)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

JobStatusTracker.propTypes = {
  tableData: PropTypes.shape({
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
  }).isRequired,
};

export default JobStatusTracker;