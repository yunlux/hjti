import { Database, LockKeyhole, ServerOff } from "lucide-react";

const items = [
  {
    icon: ServerOff,
    title: "不上传服务器",
    text: "HJTI-64 Preview 是纯前端应用，结果计算在你的浏览器里完成。",
  },
  {
    icon: Database,
    title: "只保存在本地",
    text: "你的答案使用 localStorage 保存在当前浏览器，不会写入数据库。",
  },
  {
    icon: LockKeyhole,
    title: "可随时清除",
    text: "点击重新测试会清空本地答案；你也可以在浏览器设置里清除站点数据。",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-semibold text-white">隐私说明</h1>
      <p className="mt-4 text-lg leading-8 text-slate-300">
        HJTI 不收集用户数据，不需要登录，也不需要后端。所有答案只保存在你当前设备的浏览器本地存储中。
      </p>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="glass-card p-5">
              <Icon className="h-6 w-6 text-cyan-200" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
            </article>
          );
        })}
      </section>

      <section className="glass-card mt-10 p-5 text-sm leading-6 text-slate-300">
        <h2 className="text-xl font-semibold text-white">localStorage Key</h2>
        <p className="mt-3">答案：hjti_answers_v1</p>
        <p>当前进度：hjti_current_index_v1</p>
      </section>
    </div>
  );
}
