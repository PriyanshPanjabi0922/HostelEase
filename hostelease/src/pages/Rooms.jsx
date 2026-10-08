import { useState, useCallback } from "react";
import Icon from "../components/Icon";
import Badge from "../components/Badge";
import Modal from "../components/Modal";
import RoomForm from "../components/RoomForm";
import Skeleton from "../components/Skeleton";
import useFetch from "../services/useFetch";
import { roomsApi } from "../services/api";

export default function Rooms({ user }) {
  const isAdmin = user?.role === "admin";

  const load = useCallback(() => roomsApi.getAll(), []);
  const { data: rooms, loading, error, reload } = useFetch(load);
  const [view, setView] = useState("cards");
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);

  const run = async (action) => {
    setSaving(true);

    try {
      await action();
      await reload();
      setModal(null);
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const actions = (r) => {
    if (!isAdmin) return null;

    return (
      <div className="actions">
        <button
          className="icon-btn"
          title="Edit room"
          onClick={() => setModal({ type: "edit", room: r })}
        >
          <Icon name="edit" size={17} />
        </button>

        <button
          className="icon-btn danger"
          title="Delete room"
          onClick={() => setModal({ type: "delete", room: r })}
        >
          <Icon name="trash" size={17} />
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="page-head">
        <p>Manage beds, availability and maintenance for every room.</p>

        <div className="head-actions">
          <div className="segmented">
            <button
              className={view === "cards" ? "active" : ""}
              onClick={() => setView("cards")}
              aria-label="Card view"
            >
              <Icon name="grid" size={17} />
            </button>

            <button
              className={view === "table" ? "active" : ""}
              onClick={() => setView("table")}
              aria-label="Table view"
            >
              <Icon name="list" size={17} />
            </button>
          </div>

          {isAdmin && (
            <button
              className="btn primary"
              onClick={() => setModal({ type: "add" })}
            >
              <Icon name="plus" size={18} />
              Add room
            </button>
          )}
        </div>
      </div>

      {loading && <Skeleton count={6} height={170} />}

      {error && <p className="form-error">{error}</p>}

      {!loading && rooms && view === "cards" && (
        <div className="room-grid">
          {rooms.map((r) => (
            <article className="room-card" key={r._id}>
              <header>
                <div>
                  <h3>{r.number}</h3>
                  <small>Floor {r.floor}</small>
                </div>

                <Badge text={r.status} />
              </header>

              <div className="beds">
                <div
                  style={{
                    width: `${(r.occupied / r.capacity) * 100}%`,
                  }}
                />
              </div>

              <dl>
                <div>
                  <dt>Capacity</dt>
                  <dd>{r.capacity}</dd>
                </div>

                <div>
                  <dt>Occupied</dt>
                  <dd>{r.occupied}</dd>
                </div>

                <div>
                  <dt>Available</dt>
                  <dd>{r.capacity - r.occupied}</dd>
                </div>
              </dl>

              {actions(r)}
            </article>
          ))}
        </div>
      )}

      {!loading && rooms && view === "table" && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Room</th>
                <th>Floor</th>
                <th>Capacity</th>
                <th>Occupied</th>
                <th>Available</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {rooms.map((r) => (
                <tr key={r._id}>
                  <td>
                    <strong>{r.number}</strong>
                  </td>

                  <td>{r.floor}</td>
                  <td>{r.capacity}</td>
                  <td>{r.occupied}</td>
                  <td>{r.capacity - r.occupied}</td>

                  <td>
                    <Badge text={r.status} />
                  </td>

                  <td>{actions(r)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal?.type === "add" && (
        <Modal title="Add room" onClose={() => setModal(null)}>
          {(close) => (
            <RoomForm
              saving={saving}
              onCancel={close}
              onSubmit={(d) => run(() => roomsApi.create(d))}
            />
          )}
        </Modal>
      )}

      {modal?.type === "edit" && (
        <Modal
          title={`Edit room ${modal.room.number}`}
          onClose={() => setModal(null)}
        >
          {(close) => (
            <RoomForm
              initial={modal.room}
              saving={saving}
              onCancel={close}
              onSubmit={(d) => run(() => roomsApi.update(modal.room._id, d))}
            />
          )}
        </Modal>
      )}

      {modal?.type === "delete" && (
        <Modal title="Delete room" onClose={() => setModal(null)}>
          {(close) => (
            <>
              <p className="modal-text">
                Delete room <strong>{modal.room.number}</strong>? This cannot be
                undone.
              </p>

              <div className="form-actions">
                <button className="btn ghost" onClick={close}>
                  Cancel
                </button>

                <button
                  className="btn danger"
                  disabled={saving}
                  onClick={() => run(() => roomsApi.remove(modal.room._id))}
                >
                  {saving ? "Deleting..." : "Delete room"}
                </button>
              </div>
            </>
          )}
        </Modal>
      )}
    </>
  );
}
