"use client";

import { useState, useEffect } from "react";
import styles from "./Notification.module.scss";
import { useGetWorkTime } from "@/hooks/work-time/useGetWorkTime";
import { useGetHolidayTime } from "@/hooks/holiday-time/useGetHolidayTime";

export default function TimeNotification() {
  const [isWorkVisible, setIsWorkVisible] = useState(false);
  const [isHolidayVisible, setIsHolidayVisible] = useState(false);

  const {
    data: workTimes,
    isLoading: isWorkLoading,
    isError: isWorkError,
  } = useGetWorkTime();
  const {
    data: holidayTimes,
    isLoading: isHolidayLoading,
    isError: isHolidayError,
  } = useGetHolidayTime();

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      let workIsOutOfTime = false;
      let holidayIsActive = false;

      // Проверка рабочего времени
      if (workTimes && !isWorkLoading && !isWorkError) {
        workIsOutOfTime = workTimes.some(({ from, to }) =>
          isOutOfWorkTime(from, to, "Asia/Chita")
        );
      }

      // Проверка праздничных дней
      if (holidayTimes && !isHolidayLoading && !isHolidayError) {
        holidayIsActive = holidayTimes.some(({ from, to }) => {
          return isOutOfHolidayTime(from, to); // Используем исправленную функцию
        });
      }

      setIsWorkVisible(workIsOutOfTime);
      setIsHolidayVisible(holidayIsActive);
    };

    checkTime();

    const intervalId = setInterval(checkTime, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [
    workTimes,
    holidayTimes,
    isWorkLoading,
    isWorkError,
    isHolidayLoading,
    isHolidayError,
  ]);

  // Если ни одно уведомление неактивно
  if (
    (!isWorkVisible && !isHolidayVisible) ||
    isWorkLoading ||
    isWorkError ||
    isHolidayLoading ||
    isHolidayError
  ) {
    return null;
  }

  return (
    <div className={styles.notificationsContainer}>
      {/* Уведомление о рабочем времени */}
      {isWorkVisible && (
        <div className={styles.notification}>
          <div className={styles.content}>
            <div className={styles.wrapper}>
              <ul className={styles.list}>
                {workTimes?.map((workTime) => (
                  <li className={styles.item} key={`work-${workTime.id}`}>
                    <div className={styles.item_wrapper}>
                      <div>
                        <span className={styles.message_title}>
                          Дорогие клиенты!
                        </span>
                        <br />
                        <span className={styles.message_content}>
                          Прием заказов:
                          <br /> с <b>{workTime.from}</b> до{" "}
                          <b>{workTime.to}</b>
                        </span>
                      </div>
                      <div>{workTime.message}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className={styles.closeButton}
              onClick={() => setIsWorkVisible(false)}
            >
              ✖
            </button>
          </div>
        </div>
      )}

      {/* Уведомление о праздничных днях */}
      {isHolidayVisible && (
        <div className={`${styles.notification} ${styles.holidayNotification}`}>
          <div className={styles.content}>
            <div className={styles.wrapper}>
              <ul className={styles.list}>
                {holidayTimes?.map((holidayTime) => (
                  <li className={styles.item} key={`holiday-${holidayTime.id}`}>
                    <div className={styles.item_wrapper}>
                      <div>
                        <span className={styles.message_title}>
                          Выходные дни!
                        </span>
                        <br />
                        {/* <span className={styles.message_content}>
                          Мы не работаем:
                          <br /> с <b>{holidayTime.from}</b> по{" "}
                          <b>{holidayTime.to}</b>
                        </span> */}
                      </div>
                      <div className={styles.message_content}>
                        {holidayTime.message}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className={styles.closeButton}
              onClick={() => setIsHolidayVisible(false)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Функция для проверки праздничных дней, игнорируя время
function isOutOfHolidayTime(from: string, to: string) {
  const now = new Date();

  // Преобразуем даты начала и конца выходных в объект Date без времени (00:00)
  const holidayStart = new Date(from);
  const holidayEnd = new Date(to);

  // Устанавливаем время для обоих объектов как начало дня (00:00)
  holidayStart.setHours(0, 0, 0, 0);
  holidayEnd.setHours(23, 59, 59, 999); // Конец дня - до 23:59:59.999

  // Сравниваем только даты
  return now >= holidayStart && now <= holidayEnd;
}

// Функция для проверки рабочего времени
function isOutOfWorkTime(from: any, to: any, timeZone = "Asia/Chita") {
  const now = new Date();

  // Преобразуем текущее время в заданный часовой пояс
  const zonedNow = new Date(now.toLocaleString("en-US", { timeZone }));

  const currentHours = zonedNow.getHours();
  const currentMinutes = zonedNow.getMinutes();

  const [fromHours, fromMinutes] = from.split(":").map(Number);
  const [toHours, toMinutes] = to.split(":").map(Number);

  const isAfterToTime =
    currentHours > toHours ||
    (currentHours === toHours && currentMinutes > toMinutes);
  const isBeforeFromTime =
    currentHours < fromHours ||
    (currentHours === fromHours && currentMinutes < fromMinutes);

  return isAfterToTime || isBeforeFromTime;
}
