import { useState, useCallback } from "react";
import Icon from "../components/Icon";
import Badge from "../components/Badge";
import Modal from "../components/Modal";
import Skeleton from "../components/Skeleton";
import useFetch from "../services/useFetch";
import { noticesApi } from "../services/api";

export default function Notices({ user }) {
  const load = useCallback(() => noticesApi.getAll(), []);
  const { data, loading, error, reload } = useFetch(load);

  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);

  const isAdmin = user?.role === "admin";

  const list = (data || []).filter(
    (n) => filter === "All" || n.priority === filter
  );

  const openAdd = () => {
    setModal({
      type: "add",
      notice: {
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        priority: "Medium",
      },
    });
  };

  const openEdit = (notice) => {
    setModal({
      type: "edit",
      notice: { ...notice },
    });
  };

  const closeModal = () => {
    if (!saving) {
      setModal(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notice = modal.notice;

    if (!notice.title.trim() || !notice.description.trim() || !notice.date) {
      alert("Please fill all required fields.");
      return;
    }

    setSaving(true);

    try {
      if (modal.type === "add") {
        await noticesApi.create({
          title: notice.title.trim(),
          description: notice.description.trim(),
          date: notice.date,
          priority: notice.priority,
        });
      } else {
        await noticesApi.update(notice._id, {
          title: notice.title.trim(),
          description: notice.description.trim(),
          date: notice.date,
          priority: notice.priority,
        });
      }

      await reload();
      setModal(null);
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field, value) => {
    setModal((current) => ({
      ...current,
      notice: {
        ...current.notice,
        [field]: value,
      },
    }));
  };

  return (
    <>
      <div className="page-head">
        <p>Announcements from the warden office.</p>

        <div className="head-actions">
          <div className="chips">
            {["All", "High", "Medium", "Low"].map((p) => (
              <button
                key={p}
                className={`chip ${filter === p ? "active" : ""}`}
                onClick={() => setFilter(p)}
              >
                {p}
              </button>
            ))}
          </div>

          {isAdmin && (
            <button className="btn primary" onClick={openAdd}>
              <Icon name="plus" size={18} />
              Add notice
            </button>
          )}
        </div>
      </div>

      {loading && <Skeleton count={4} height={150} />}

      {error && <p className="form-error">{error}</p>}

      {!loading && (
        <div className="notice-grid">
          {list.map((n) => (
            <article
              className={`notice-card p-${n.priority.toLowerCase()}`}
              key={n._id}
            >
              <header>
                <Badge text={n.priority} />

                <span className="date">
                  <Icon name="calendar" size={15} />
                  {n.date}
                </span>
              </header>

              <h3>{n.title}</h3>

              <p>{n.description}</p>

              {isAdmin && (
                <div className="actions">
                  <button
                    className="icon-btn"
                    title="Edit notice"
                    onClick={() => openEdit(n)}
                  >
                    <Icon name="edit" size={17} />
                  </button>
                </div>
              )}
            </article>
          ))}

          {list.length === 0 && (
            <p className="empty">No notices match the selected priority.</p>
          )}
        </div>
      )}

      {modal && (
        <Modal
          title={modal.type === "add" ? "Add notice" : "Edit notice"}
          onClose={closeModal}
        >
          {(close) => (
            <form onSubmit={handleSubmit}>
              <label>
                Title
                <input
                  type="text"
                  value={modal.notice.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Enter notice title"
                  required
                />
              </label>

              <label>
                Description
                <textarea
                  value={modal.notice.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Enter notice description"
                  rows="4"
                  required
                />
              </label>

              <label>
                Date
                <input
                  type="date"
                  value={modal.notice.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  required
                />
              </label>

              <label>
                Priority
                <select
                  value={modal.notice.priority}
                  onChange={(e) => updateField("priority", e.target.value)}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </label>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn ghost"
                  onClick={close}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button type="submit" className="btn primary" disabled={saving}>
                  {saving
                    ? "Saving..."
                    : modal.type === "add"
                    ? "Add notice"
                    : "Save changes"}
                </button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </>
  );
}
