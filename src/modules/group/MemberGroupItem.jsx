/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ActionMember from "../../components/action/ActionMember";
import LabelStatus from "../../components/label/LabelStatus";
import Account from "../../components/user/Account";
import { getCurrentUser } from "../../utils/constants";

function MemberGroupItem({ data }) {
  const id = data?.user_id;
  const [member, setMember] = useState({});
  const user = getCurrentUser();
  useEffect(() => {
    try {
      axios
        .get(`/user/profile/${id}`, {
          headers: { Authorization: `Bearer ${user.access_token}` },
        })
        .then(res => setMember(res.data));
      //   setMember(res.data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  console.log(data.role);
  return (
    <tr>
      <td>
        <Account username={member?.user?.name} type={data.role} />
      </td>
      <td>
        <LabelStatus type="success">{data.status}</LabelStatus>
      </td>
      <td>
        <ActionMember />
      </td>
    </tr>
  );
}
MemberGroupItem.propTypes = {
  data: PropTypes.object,
};

export default MemberGroupItem;
