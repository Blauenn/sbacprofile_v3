import { NavLink } from "react-router-dom";
import { LeaveNotice } from "../../../interfaces/common.interface";
import Dashboard_requestTimeline from "../Dashboard_requestTimeline.component";

// TODO: Complete this component. //
interface CurrentComponentProp {
  selfLeaveNotice: LeaveNotice[];
  requestForms: any;
}

const StudentPendingButtons = (props: CurrentComponentProp) => {
  const { selfLeaveNotice, requestForms } = props;

  return (
    <>
      {selfLeaveNotice.length !== 0 && (
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-4">
            Leave notices
            <NavLink to="/leaveNotice">
              <i className="fa-solid fa-circle-plus ms-2 hover:text-green-500"></i>
            </NavLink>
          </h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
            {[...selfLeaveNotice]
              .reverse()
              .slice(0, 3)
              .map((leaveNotice: LeaveNotice) => (
                <NavLink
                  key={leaveNotice.leave_notice_ID}
                  to={`/leaveNotice?id=${leaveNotice.leave_notice_ID}`}>
                  <Dashboard_requestTimeline leaveNotice={leaveNotice} />
                </NavLink>
              ))}
          </div>
        </div>
      )}
      {/* Request forms */}
      {requestForms.length !== 0 && (
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-4">
            Request forms
            <NavLink to="/requestForms">
              <i className="fa-solid fa-circle-plus ms-2 hover:text-green-500"></i>
            </NavLink>
          </h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
            {[...selfLeaveNotice]
              .reverse()
              .slice(0, 3)
              .map((leaveNotice: LeaveNotice) => (
                <NavLink
                  key={leaveNotice.leave_notice_ID}
                  to={`/requestForms?id=${leaveNotice.leave_notice_ID}`}>
                  <Dashboard_requestTimeline leaveNotice={leaveNotice} />
                </NavLink>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default StudentPendingButtons;
