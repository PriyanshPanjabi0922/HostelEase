import { useState, useCallback, useMemo } from "react";
import Icon from "../components/Icon";
import Badge from "../components/Badge";
import Dropdown from "../components/Dropdown";
import Skeleton from "../components/Skeleton";
import useFetch from "../services/useFetch";
import { complaintsApi } from "../services/api";

const STATUSES = ["Pending", "In Progress", "Resolved"];

export default function Complaints({ user }) {
  const isAdmin = user?.role === "admin";

  const load = useCallback(() => complaintsApi.getAll(), []);
  const { data, setData, loading, error } = useFetch(load);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const list = useMemo(
    () =>
      (data || []).filter(
        (c) =>
          (filter === "All" || c.status === filter) &&
          `${c.student} ${c.type} ${c.room}`
            .toLowerCase()
            .includes(query.toLowerCase())
      ),
    [data, query, filter]
  );

  const changeStatus = async (id, status) => {
    setData(data.map((c) => (c._id === id ? { ...c, status } : c)));

    try {
      await complaintsApi.updateStatus(id, status);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <div className="toolbar">
        <div className="search">
          <Icon name="search" size={18} />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by student, type or room"
          />
        </div>

        <div className="chips">
          {["All", ...STATUSES].map((s) => (
            <button
              key={s}
              className={`chip ${filter === s ? "active" : ""}`}
              onClick={() => setFilter(s)}
            >
              {s}
              {data && (
                <em>
                  {s === "All"
                    ? data.length
                    : data.filter((c) => c.status === s).length}
                </em>
              )}
            </button>
          ))}
        </div>
      </div>

      {loading && <Skeleton count={5} height={64} columns="rows" />}

      {error && <p className="form-error">{error}</p>}

      {!loading && data && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Complaint type</th>
                <th>Room</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {list.map((c) => (
                <tr key={c._id}>
                  <td>
                    <strong>{c.student}</strong>
                  </td>

                  <td>{c.type}</td>
                  <td>{c.room}</td>
                  <td>{c.date}</td>

                  <td>
                    {isAdmin ? (
                      <Dropdown
                        items={STATUSES.map((s) => ({
                          label: s,
                          active: s === c.status,
                          onClick: () => changeStatus(c._id, s),
                        }))}
                      >
                        <Badge text={c.status} />
                        <Icon name="chevron" size={14} />
                      </Dropdown>
                    ) : (
                      <Badge text={c.status} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {list.length === 0 && (
            <p className="empty">
              No complaints match your search. Try a different keyword or
              filter.
            </p>
          )}
        </div>
      )}
    </>
  );
}
  