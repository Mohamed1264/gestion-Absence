import data from "../db.json";

export default function GroupSchedule(props) {
    // Define session times
    const sessions = [
        { start: "08:30", end: "11:00" },
        { start: "11:00", end: "13:30" },
        { start: "13:30", end: "16:00" },
        { start: "16:00", end: "18:30" },
    ];

    // Function to normalize time values
    const normalizeTime = (time) => time.trim().padStart(5, "0");

    // Get the current date in "YYYY-MM-DD" format
    const filtered_date = props.date ? new Date(props.date) : new Date();
    const formatted_date = filtered_date.toISOString().split("T")[0];
     
    // Log to check if props.id_group is of the correct type
    console.log(formatted_date,"=", data.seance[0].date_debut);

    // Normalize id_group to match the data type
    const groupId = Number(props.id_group);

    // Filter and map schedule data
    const scheduleData = data.seance
        .filter((s) =>
            s.FK_group == groupId &&
            formatted_date >= s.date_debut &&
            formatted_date <= s.date_fin
        )
        .map((s, i) => {
            const teacher = data.teacher.find((t) => t.id_teacher === s.FK_teacher);
            const room = data.salle.find((r) => r.id_salle === s.FK_salle);

            return {
                idSession: i,
                day: s.jour.trim().toLowerCase(),
                start: normalizeTime(s.heure_debut),
                end: normalizeTime(s.heure_fin),
                teacher: teacher ? `${teacher.nom} ${teacher.prenom}` : "Unknown",
                room: room ? room.nom_salle : "Unknown",
            };
        });

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
        <div className="grid grid-cols-[140px_repeat(4,1fr)] grid-rows-[50px_repeat(6,auto)] grid-flow-row-dense auto-cols-max gap-1 p-2">
            {/* Sessions Header */}
            <div className="col-start-1 row-start-1"></div>
            {sessions.map((session, index) => (
                <div key={index} className={`col-start-${index + 2} row-start-1`}>
                    <span className="px-2 py-1 text-lg bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 dark:from-gray-800 dark:to-gray-700 dark:border-gray-600 dark:text-gray-50 font-semibold text-center flex items-center justify-center h-full rounded-t-lg">
                        {session.start} - {session.end}
                    </span>
                </div>
            ))}

            {/* Days Column */}
            {days.map((day, index) => (
                <div key={index} className={`col-start-1 row-start-${index + 2}`}>
                    <span className="bg-gradient-to-b from-gray-100 to-gray-200 border border-gray-300 dark:from-gray-800 dark:to-gray-700 dark:border-gray-600 dark:text-gray-50 text-gray-700 font-semibold text-lg flex items-center justify-center px-4 py-1 h-full">
                        {day}
                    </span>
                </div>
            ))}

            {/* Schedule Grid with Merged Sessions */}
            {days.map((day, dayIndex) =>
                sessions.map((session, sessionIndex) => {
                    const normalizedDay = day.trim().toLowerCase();
                    const normalizedStart = normalizeTime(session.start);

                    const matchingSession = scheduleData.find(
                        (s) => s.day === normalizedDay && s.start === normalizedStart
                    );

                    const isLongSession =
                        matchingSession?.end === "18:30" || matchingSession?.end === "13:30";

                    return (
                        <div
                            key={`${dayIndex}-${sessionIndex}`}
                            className={`col-start-${sessionIndex + 2} row-start-${dayIndex + 2} ${
                                isLongSession ? "col-span-2" : ""
                            } bg-gray-50 border border-gray-300 dark:border-gray-600 dark:bg-gray-700/95 min-h-16 p-1 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-600`}
                        >
                            {matchingSession && (
                                <div className="h-full w-full bg-gradient-to-r from-purple-100 to-purple-200 border border-purple-300 hover:from-purple-200 hover:to-purple-300 text-purple-700 dark:from-purple-700 dark:to-purple-600 dark:border-purple-600 dark:text-purple-50 flex flex-col items-center justify-center gap-2 rounded-lg p-2 transition-all duration-300">
                                    <span className="text-sm font-bold">{matchingSession.teacher}</span>
                                    <span className="text-xs font-medium">{matchingSession.room}</span>
                                </div>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
}
