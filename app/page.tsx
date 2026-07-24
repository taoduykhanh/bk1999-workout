"use client";

import { useEffect, useMemo, useState } from "react";

type Exercise = {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  note: string;
  gear?: string;
};

type Day = {
  key: string;
  short: string;
  title: string;
  focus: string;
  tone: string;
  duration: string;
  exercises: Exercise[];
};

const days: Day[] = [
  {
    key: "mon",
    short: "T2",
    title: "Ngực + tay sau",
    focus: "Buổi nặng",
    tone: "coral",
    duration: "50–60 phút",
    exercises: [
      { name: "Đẩy ngực giữa", sets: "4", reps: "6–10", rest: "120s", note: "Dừng khi còn dư 2 lần lặp." },
      { name: "Đẩy ngực trên", sets: "3", reps: "8–12", rest: "90s", note: "Giữ bả vai ép xuống ghế." },
      { name: "Ép ngực", sets: "3", reps: "10–15", rest: "75s", note: "Khép tay có kiểm soát, không bật tạ." },
      { name: "Kéo cáp tay sau", sets: "3", reps: "10–15", rest: "60s", note: "Giữ khuỷu tay sát thân." },
      { name: "Duỗi tay sau qua đầu", sets: "2", reps: "12–15", rest: "60s", note: "Dùng cáp thấp, tải vừa." },
    ],
  },
  {
    key: "tue",
    short: "T3",
    title: "Lưng/xô + tay trước",
    focus: "Buổi nặng + vai sau",
    tone: "blue",
    duration: "55–65 phút",
    exercises: [
      { name: "Xà đơn hoặc kéo xô trước", sets: "4", reps: "6–10", rest: "120s", note: "Kéo khuỷu xuống, không giật người." },
      { name: "Kéo lưng giữa", sets: "4", reps: "8–12", rest: "90s", note: "Dừng một nhịp khi bả vai khép." },
      { name: "Kéo xô tay hẹp", sets: "3", reps: "10–12", rest: "75s", note: "Giữ ngực cao và thân ổn định." },
      { name: "Kéo cáp về mặt", sets: "3", reps: "12–15", rest: "60s", note: "Vai sau; tải nhẹ, khuỷu mở.", gear: "Dây thừng cáp" },
      { name: "Cuốn tay trước với cáp", sets: "3", reps: "10–15", rest: "60s", note: "Không đưa khuỷu ra trước." },
    ],
  },
  {
    key: "wed",
    short: "T4",
    title: "Chân + mông + đùi",
    focus: "Buổi thân dưới",
    tone: "lime",
    duration: "55–65 phút",
    exercises: [
      { name: "Squat với đòn", sets: "4", reps: "6–10", rest: "150s", note: "Ưu tiên biên độ an toàn và kiểm soát." },
      { name: "Đá đùi trước", sets: "3", reps: "10–15", rest: "75s", note: "Không khóa gối mạnh ở điểm cao." },
      { name: "Cuốn đùi sau", sets: "3", reps: "10–15", rest: "75s", note: "Nếu bộ phận chân của máy cho phép." },
      { name: "Romanian deadlift", sets: "3", reps: "8–12", rest: "120s", note: "Giữ lưng trung lập; tập kỹ thuật trước.", gear: "Tạ đơn điều chỉnh" },
      { name: "Nâng bắp chân", sets: "4", reps: "12–20", rest: "60s", note: "Dừng một nhịp ở điểm cao.", gear: "Tạ đơn điều chỉnh" },
    ],
  },
  {
    key: "thu",
    short: "T5",
    title: "Vai + bụng",
    focus: "Vai giữa, vai trước nhẹ",
    tone: "violet",
    duration: "40–50 phút",
    exercises: [
      { name: "Đẩy vai", sets: "3", reps: "8–12", rest: "90s", note: "Không tập tới thất bại; vai trước đã làm việc ở buổi ngực." },
      { name: "Nâng vai ngang", sets: "4", reps: "12–20", rest: "60s", note: "Tải nhẹ, không nhún người.", gear: "Tạ đơn điều chỉnh" },
      { name: "Nâng vai ngang một tay với cáp", sets: "2", reps: "12–15", rest: "60s", note: "Có thể thay bài tạ đơn nếu máy bố trí thuận tiện." },
      { name: "Gập bụng trên ghế", sets: "3", reps: "12–20", rest: "45s", note: "Thở ra khi cuộn thân." },
      { name: "Plank", sets: "3", reps: "30–60s", rest: "45s", note: "Siết mông, không võng lưng.", gear: "Thảm tập" },
    ],
  },
  {
    key: "fri",
    short: "T6",
    title: "Lưng/xô + tay trước",
    focus: "Buổi vừa",
    tone: "blue",
    duration: "45–55 phút",
    exercises: [
      { name: "Kéo xô trước", sets: "3", reps: "10–15", rest: "90s", note: "Dùng tải nhẹ hơn thứ 3 khoảng 10–15%." },
      { name: "Kéo lưng giữa", sets: "3", reps: "10–15", rest: "75s", note: "Nhịp chậm, tập trung cảm nhận lưng." },
      { name: "Kéo xô tay hẹp", sets: "2", reps: "12–15", rest: "75s", note: "Không ngả người quá nhiều." },
      { name: "Cuốn tay trước với cáp", sets: "3", reps: "12–15", rest: "60s", note: "Dừng trước thất bại 2–3 lần lặp." },
      { name: "Cuốn búa", sets: "2", reps: "12–15", rest: "60s", note: "Bổ sung cẳng tay và cơ cánh tay.", gear: "Tạ đơn điều chỉnh" },
    ],
  },
  {
    key: "sat",
    short: "T7",
    title: "Ngực + tay sau",
    focus: "Buổi vừa",
    tone: "coral",
    duration: "45–55 phút",
    exercises: [
      { name: "Đẩy ngực trên", sets: "3", reps: "10–15", rest: "90s", note: "Không lặp lại cường độ nặng của thứ 2." },
      { name: "Đẩy ngực giữa", sets: "3", reps: "10–15", rest: "90s", note: "Hạ tạ chậm 2–3 giây." },
      { name: "Ép ngực", sets: "2", reps: "12–15", rest: "75s", note: "Giữ căng cơ, không chạm hai tay mạnh." },
      { name: "Kéo cáp tay sau", sets: "3", reps: "12–15", rest: "60s", note: "Giữ vai cố định." },
      { name: "Chống đẩy", sets: "2", reps: "Gần tối đa", rest: "90s", note: "Dừng trước khi kỹ thuật biến dạng." },
    ],
  },
  {
    key: "sun",
    short: "CN",
    title: "Nghỉ hoàn toàn",
    focus: "Phục hồi",
    tone: "sand",
    duration: "Không tập tạ",
    exercises: [
      { name: "Đi lại nhẹ trong ngày", sets: "—", reps: "Tùy sức", rest: "—", note: "Không bắt buộc; máy chạy do bạn tự sắp xếp." },
      { name: "Giãn cơ nhẹ", sets: "1", reps: "5–10 phút", rest: "—", note: "Không kéo căng tới mức đau." },
      { name: "Ngủ và dinh dưỡng", sets: "—", reps: "7–9 giờ ngủ", rest: "—", note: "Ưu tiên protein và đủ năng lượng để hồi phục." },
    ],
  },
];

const gear = [
  {
    rank: "01",
    name: "Tạ đơn điều chỉnh",
    verdict: "Nên mua",
    why: "Bù đúng điểm yếu của giàn: Romanian deadlift, nâng vai ngang, cuốn búa và bài đơn bên.",
  },
  {
    rank: "02",
    name: "Dây thừng kéo cáp",
    verdict: "Rất hữu ích",
    why: "Tập face pull và tay sau thoải mái hơn tay cầm thẳng; giá thấp, chiếm ít chỗ.",
  },
  {
    rank: "03",
    name: "Thảm tập",
    verdict: "Nên có",
    why: "Dùng cho plank, bài bụng và giãn cơ. Không cần loại quá dày.",
  },
  {
    rank: "04",
    name: "Dây kháng lực",
    verdict: "Tùy chọn",
    why: "Hỗ trợ khởi động vai, mông và trợ lực xà đơn; không bắt buộc khi ngân sách hạn chế.",
  },
];

export default function Home() {
  const [active, setActive] = useState("mon");
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bk1999-progress");
      if (saved) setDone(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("bk1999-progress", JSON.stringify(done));
    } catch {}
  }, [done]);

  const selected = useMemo(() => days.find((day) => day.key === active) ?? days[0], [active]);
  const completed = selected.exercises.filter((_, index) => done[`${selected.key}-${index}`]).length;
  const percent = Math.round((completed / selected.exercises.length) * 100);

  return (
    <main>
      <header className="hero">
        <nav>
          <a className="brand" href="#top" aria-label="Trang đầu">
            <span className="brand-mark">BK</span>
            <span>HOME GYM</span>
          </a>
          <div className="nav-meta">
            <span>6 buổi tập</span>
            <span className="nav-dot" />
            <span>1 ngày nghỉ</span>
          </div>
        </nav>

        <section className="hero-copy" id="top">
          <p className="eyebrow">LỊCH TẬP CÁ NHÂN · BK-1999 PRO</p>
          <h1>
            Tập có chiến lược.
            <br />
            <em>Phục hồi có chủ đích.</em>
          </h1>
          <div className="hero-bottom">
            <p>
              Lịch Push · Pull · Legs được điều chỉnh cho giàn tạ tại nhà:
              ngực và lưng hai lần mỗi tuần, vai sau đi cùng ngày kéo, Chủ nhật hồi phục.
            </p>
            <a className="jump" href="#schedule">
              Xem lịch tuần <span>↓</span>
            </a>
          </div>
        </section>
      </header>

      <section className="schedule" id="schedule">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark">TUẦN TẬP CỦA BẠN</p>
            <h2>Chọn ngày. Bắt đầu tập.</h2>
          </div>
          <p className="section-note">
            Khởi động 5–8 phút trước mỗi buổi. Các hiệp khởi động không tính vào số hiệp bên dưới.
          </p>
        </div>

        <div className="day-tabs" role="tablist" aria-label="Chọn ngày tập">
          {days.map((day) => (
            <button
              key={day.key}
              className={active === day.key ? "active" : ""}
              onClick={() => setActive(day.key)}
              role="tab"
              aria-selected={active === day.key}
            >
              <b>{day.short}</b>
              <span>{day.title.split(" + ")[0]}</span>
            </button>
          ))}
        </div>

        <article className={`workout-card ${selected.tone}`}>
          <div className="workout-head">
            <div>
              <p>{selected.focus}</p>
              <h3>{selected.title}</h3>
            </div>
            <div className="duration">
              <span>THỜI LƯỢNG</span>
              <strong>{selected.duration}</strong>
            </div>
          </div>

          <div className="progress-row">
            <div className="progress-track">
              <span style={{ width: `${percent}%` }} />
            </div>
            <b>{completed}/{selected.exercises.length} hoàn thành</b>
          </div>

          <div className="exercise-list">
            <div className="table-head">
              <span>BÀI TẬP</span><span>HIỆP</span><span>SỐ LẦN</span><span>NGHỈ</span>
            </div>
            {selected.exercises.map((exercise, index) => {
              const id = `${selected.key}-${index}`;
              return (
                <label className={`exercise ${done[id] ? "is-done" : ""}`} key={exercise.name}>
                  <input
                    type="checkbox"
                    checked={Boolean(done[id])}
                    onChange={(event) => setDone((current) => ({ ...current, [id]: event.target.checked }))}
                  />
                  <span className="checkmark" aria-hidden="true">✓</span>
                  <span className="exercise-name">
                    <strong>{exercise.name}</strong>
                    <small>{exercise.note}</small>
                    {exercise.gear && <i>+ {exercise.gear}</i>}
                  </span>
                  <b>{exercise.sets}</b>
                  <b>{exercise.reps}</b>
                  <b>{exercise.rest}</b>
                </label>
              );
            })}
          </div>
        </article>
      </section>

      <section className="principles">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark">NGUYÊN TẮC VẬN HÀNH</p>
            <h2>Đủ tải, không quá tải.</h2>
          </div>
        </div>
        <div className="principle-grid">
          <article>
            <span>48–72H</span>
            <h3>Khoảng nghỉ mục tiêu</h3>
            <p>Nhóm cơ chính có ít nhất 48 giờ trước lần tập tiếp theo. Lưng nghỉ 72 giờ giữa hai buổi.</p>
          </article>
          <article>
            <span>RIR 2</span>
            <h3>Dừng đúng lúc</h3>
            <p>Kết thúc phần lớn hiệp khi bạn vẫn có thể thực hiện thêm khoảng 2 lần với kỹ thuật chuẩn.</p>
          </article>
          <article>
            <span>+1</span>
            <h3>Tăng tiến từ tốn</h3>
            <p>Khi đạt đầu trên khoảng lặp ở mọi hiệp trong hai buổi, tăng mức tạ nhỏ nhất.</p>
          </article>
        </div>
        <aside className="safety">
          <b>Lưu ý an toàn</b>
          <p>
            Không đẩy ngực hoặc squat nặng một mình nếu chốt an toàn chưa được đặt đúng.
            Đau cơ âm ỉ có thể bình thường; đau nhói ở khớp, chóng mặt hoặc đau ngực là tín hiệu dừng tập.
          </p>
        </aside>
      </section>

      <section className="gear">
        <div className="gear-intro">
          <p className="eyebrow">DỤNG CỤ BỔ SUNG</p>
          <h2>BK-1999 Pro làm được phần lớn. Đây là phần còn thiếu.</h2>
          <p>
            Không cần mua cả phòng gym. Một đôi tạ đơn điều chỉnh giúp hoàn thiện chuỗi vận động hông,
            vai giữa và các bài đơn bên mà giàn cáp khó thay thế.
          </p>
        </div>
        <div className="gear-list">
          {gear.map((item) => (
            <article key={item.rank}>
              <span className="gear-rank">{item.rank}</span>
              <div>
                <h3>{item.name}</h3>
                <p>{item.why}</p>
              </div>
              <b>{item.verdict}</b>
            </article>
          ))}
        </div>
        <div className="buy-line">
          <span>Nếu chỉ mua một món</span>
          <strong>Tạ đơn điều chỉnh, tổng tải khoảng 20–30 kg là lựa chọn đầu tiên.</strong>
        </div>
      </section>

      <footer>
        <p>BK HOME GYM · KẾ HOẠCH 6 + 1</p>
        <button onClick={() => setDone({})}>Đặt lại tiến độ tuần</button>
      </footer>
    </main>
  );
}
