import Link from "next/link";

export default function FourOhFour() {
  return (
    <div>
      <h2>404 - 页面未找到</h2>
      <p>抱歉，您访问的页面不存在。</p>
      <Link href="/home">
        <a>返回首页</a>
      </Link>
    </div>
  );
}
