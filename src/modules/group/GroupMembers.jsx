/* eslint-disable jsx-a11y/control-has-associated-label */
import { Button } from "@mui/material";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import React from "react";
import LayoutMain from "../../components/layout/LayoutMain";
import GroupBar from "../../components/menu/GroupBar";
import Table from "../../components/table/Table";
import Account from "../../components/user/Account";
import LabelStatus from "../../components/label/LabelStatus";
import ActionMember from "../../components/action/ActionMember";

function GroupMembers() {
  return (
    <LayoutMain className="!bg-white">
      <div className="flex ">
        <GroupBar />
        <div className="px-32 py-8 flex-1 flex flex-col gap-4">
          <div className="flex gap-4">
            <Button variant="contained" className="w-6 bg-white hover:bg-gray-100">
              <KeyboardBackspaceOutlinedIcon className="text-black" />
            </Button>
            <div>
              <h1 className="font-bold text-2xl text-gray-800">Group members</h1>
            </div>
          </div>
          <Button variant="contained bg-blue-700 normal-case text-white font-semibold hover:bg-blue-800 ml-auto w-fit px-4 py-2 mt-4">
            Invite
          </Button>
          <Table>
            <thead>
              <tr>
                <th className="w-2/4">Name</th>
                <th>Status</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Account username="ngoctu280801" type="admin" />
                </td>
                <td>
                  <LabelStatus type="success">Active</LabelStatus>
                </td>
                <td>
                  <ActionMember />
                </td>
              </tr>
              <tr>
                <td>
                  <Account username="manucian" className="bg-red-500" />
                </td>
                <td>
                  <LabelStatus type="pending">Join pending</LabelStatus>
                </td>
                <td>
                  <ActionMember isPending />
                </td>
              </tr>
              <tr>
                <td>
                  <Account username="muvodoi" />
                </td>
                <td>
                  <LabelStatus type="danger">Reject</LabelStatus>
                </td>
                <td>
                  <ActionMember />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </LayoutMain>
  );
}

export default GroupMembers;
