/**
 *
 * UserPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectUserPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchUsersAction } from './actions';

export function UserPage({ handleFetchUsers, userPage }) {
  useInjectReducer({ key: 'userPage', reducer });
  useInjectSaga({ key: 'userPage', saga });

  const [data, setData] = useState([]);

  useEffect(() => {
    handleFetchUsers();
  }, []);

  useEffect(() => {
    setData(userPage.users);
  }, [userPage]);

  const handleChangeInput = event => {
    if (event.target.value.trim().length > 0) {
      const filteredData = userPage.users.filter(
        item => item.name.indexOf(event.target.value) > -1,
      );
      setData(filteredData);
    } else {
      setData(userPage.users);
    }
  };

  const handleChangeSelect = event => {
    if (+event.target.value === 0) {
      setData(userPage.users);
    } else {
      const filteredData = userPage.users.filter(
        item => item.id === +event.target.value,
      );
      setData(filteredData);
    }
  };

  return (
    <div>
      <input
        type="text"
        style={{ marginBottom: '20px' }}
        onChange={handleChangeInput}
      />
      <select onChange={handleChangeSelect}>
        <option value="0">انتخاب کنید</option>
        {userPage.users.map(item => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.address.street}</td>
              <td>{item.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

UserPage.propTypes = {
  handleFetchUsers: PropTypes.func.isRequired,
  userPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userPage: makeSelectUserPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleFetchUsers: () => dispatch(fetchUsersAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserPage);
