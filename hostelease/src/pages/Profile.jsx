import Icon from "../components/Icon";

export default function Profile({ user }) {
  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const details = [
    ["mail", "Email", user.email || "Not provided"],
    ["phone", "Phone", user.phone || "Not provided"],
    ["rooms", "Room number", user.room || "Not assigned"],
    [
      "book",
      "Course",
      user.course
        ? `${user.course}${user.year ? ` (${user.year})` : ""}`
        : "Not provided",
    ],
    [
      "visitors",
      "Guardian",
      user.guardian
        ? `${user.guardian}${
            user.guardianPhone ? ` · ${user.guardianPhone}` : ""
          }`
        : "Not provided",
    ],
    ["calendar", "Joined hostel", user.joined || "Not provided"],
    ["pin", "Address", user.address || "Not provided"],
  ];

  return (
    <div className="profile">
      <div className="profile-card">
        <span className="avatar lg">{initials}</span>

        <h2>{user.name}</h2>

        <p>
          {user.role}
          {user.room ? ` · Room ${user.room}` : ""}
        </p>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h3>Personal details</h3>
        </div>

        <div className="details">
          {details.map(([icon, label, value]) => (
            <div className="detail" key={label}>
              <span className="detail-icon">
                <Icon name={icon} size={18} />
              </span>

              <div>
                <small>{label}</small>
                <strong>{value}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
