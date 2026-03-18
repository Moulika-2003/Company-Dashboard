import Sidebar from "../components/Sidebar";
import employees from "../utils/mockEmployees";

function Employees({ onLogout }) {
  const root = employees.find((e) => e.parentId === null);
  const level1 = employees.filter((e) => e.parentId === root?.id);
  const getChildren = (pid) => employees.filter((e) => e.parentId === pid);

  const OrgNode = ({ emp }) => {
    return (
      <div className="org-node">
        <div className="node-dot" style={{ background: emp.color }} />
        <div className="node-name">{emp.name}</div>
        <div className="node-role">{emp.role}</div>
        <div className="node-dept">{emp.department}</div>
      </div>
    );
  };

  return (
    <div className="app-layout">
      <Sidebar onLogout={onLogout} />

      <div className="main-content">
        <div className="org-container">
          <h3>Organization Chart</h3>

          <div className="org-tree">
            {root && (
              <div className="org-level">
                <OrgNode emp={root} />
              </div>
            )}

            <div className="org-connectors">
              <div className="org-connector-line" />
            </div>

            <div className="org-level">
              {level1.map((e) => (
                <OrgNode key={e.id} emp={e} />
              ))}
            </div>

            <div className="org-connectors">
              <div className="org-connector-line" />
            </div>

            <div className="org-level" style={{ flexWrap: "wrap" }}>
              {level1.flatMap((p) =>
                getChildren(p.id).map((e) => <OrgNode key={e.id} emp={e} />)
              )}
            </div>

            <div className="org-connectors">
              <div className="org-connector-line" />
            </div>

            <div className="org-level" style={{ flexWrap: "wrap" }}>
              {level1.flatMap((p) =>
                getChildren(p.id).flatMap((m) =>
                  getChildren(m.id).map((e) => <OrgNode key={e.id} emp={e} />)
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employees;
