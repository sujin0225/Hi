import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { addDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { ko } from 'date-fns/esm/locale';
import './Search.css';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    paddingRight:'120px'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    border: 0,
  },
  iconButton: {
    padding: 10,
  },
  
}));

function Search(props) {
  const navigate = useNavigate();
  const classes = useStyles();
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const defaultStart = `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  }`;
  const defaultEnd = `${year}-${month < 10 ? '0' + month : month}-${
    day + 1 < 10 ? '0' + day + 1 : day + 1
  }`;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));

  const [keyword, setKeyword] = useState({
    region: '',
    checkin: defaultStart,
    checkOutDate: defaultEnd,
    numberPeople: 1,
  });

  const getCheckinday = date => {
    setStartDate(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const CheckInDate = `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;
    setKeyword({ ...keyword, checkin: CheckInDate });
    console.log(CheckInDate);
  };
  const getCheckoutday = date => {
    setEndDate(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const CheckOutDate = `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;
    setKeyword({ ...keyword, checkout: CheckOutDate });
  };
  return (
    <div className={classes.container}>
    <Paper elevation={0}
  style={{ 
    padding: 8,
    width:1235,
    backgroundColor: "transparent",
    
  }}>
      <InputBase
        className={classes.input}
        placeholder="장소"
        value={keyword.region}
        onChange={e => setKeyword({ ...keyword, region: e.target.value })}
        inputProps={{ 'aria-label': '' }}
      />
      <DatePicker  wrapperClassName="datePicker"
        locale={ko}
        dateFormat="yyyy-MM-dd"
        selected={startDate}
        onChange={date => {
          getCheckinday(date);
        }}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        className={classes.input}
        minDate={new Date()}
        placeholderText="날짜를 선택해 주세요"
        
      />
      <DatePicker wrapperClassName="datePicker"
        locale={ko}
        dateFormat="yyyy-MM-dd"
        selected={endDate}
        onChange={date => getCheckoutday(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        className={classes.input}
        minDate={addDays(startDate, 1)}
        placeholderText="날짜를 선택해 주세요"
      />
      <InputBase
        className={classes.input}
        placeholder="인원"
        value={keyword.numberPeople}
        onChange={e => setKeyword({ ...keyword, numberPeople: e.target.value })}
        inputProps={{ type: 'number', min: 1 }}
      />
      <IconButton type="submit" className={classes.iconButton}>
        <SearchIcon
          onClick={() => {
            navigate(
              `/search/${keyword.region}/${keyword.checkin}/${keyword.checkout}/${keyword.numberPeople}`
            );
          }}
        />
      </IconButton>
    </Paper>
    </div>
  );
}

export default Search;
