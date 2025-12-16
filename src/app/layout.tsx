import type { Metadata } from "next";
import "@/assets/styles/globals.scss";
import Providers from "@/providers/Providers";
import Script from "next/script";
import TimeNotification from "@/components/notification/Notification";

export const metadata: Metadata = {
  title: "«Линия вкуса» — Кейтеринг в Чите, доставка готовых блюд",
  description:
    "Кейтеринг и доставка готовых блюд в Чите от «Линии вкуса». Оригинальное меню, свежие ингредиенты и профессиональное обслуживание для вашего события. Закажите прямо сейчас!",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" type="image/svg+xml" href="images/favicon.svg" />
        <meta
          name="google-site-verification"
          content="xwv6JNL9DKmdt3AVwob_RjqL_oHZXIF2kvlX8mVRI88"
        />
        <meta name="yandex-verification" content="66edbedca21ecb02" />
        {/* Yandex.Metrika */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){
                (m[i].a=m[i].a||[]).push(arguments)
              };
              m[i].l=1*new Date();
              k=e.createElement(t),a=e.getElementsByTagName(t)[0];
              k.async=1;
              k.src=r;
              a.parentNode.insertBefore(k,a)
            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(69086533, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `}
        </Script>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/69086533"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>

        {/* Top.Mail.Ru */}
        <Script id="top-mail-ru" strategy="afterInteractive">
          {`
            var _tmr = window._tmr || (window._tmr = []);
            _tmr.push({id: "3528284", type: "pageView", start: (new Date()).getTime()});
            (function (d, w, id) {
              if (d.getElementById(id)) return;
              var ts = d.createElement("script");
              ts.type = "text/javascript";
              ts.async = true;
              ts.id = id;
              ts.src = "https://top-fwz1.mail.ru/js/code.js";
              var f = function () {
                var s = d.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(ts, s);
              };
              if (w.opera == "[object Opera]") {
                d.addEventListener("DOMContentLoaded", f, false);
              } else {
                f();
              }
            })(document, window, "tmr-code");
          `}
        </Script>
        <noscript>
          <div>
            <img
              src="https://top-fwz1.mail.ru/counter?id=3528284;js=na"
              style={{ position: "absolute", left: "-9999px" }}
              alt="Top.Mail.Ru"
            />
          </div>
        </noscript>
      </head>
      <body>
        <Providers>
          <div>
            {children}
            {modal}
          </div>
          <TimeNotification />
        </Providers>
      </body>
    </html>
  );
}
