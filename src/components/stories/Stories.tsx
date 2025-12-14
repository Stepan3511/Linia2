"use client";

import { useState } from "react";
import { useGetStories } from "@/hooks/stories/useGetStories";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ReactStories from "react-insta-stories";

import styles from "./Stories.module.scss";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Stories() {
  const {
    data: storyGroups = [],
    isLoading: isLoadingStories,
    isError: isErrorStories,
  } = useGetStories();

  const [isOpen, setIsOpen] = useState(false);
  const [currentStoryGroup, setCurrentStoryGroup] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleStoryClick = (group: any) => {
    setCurrentStoryGroup(group);
    setCurrentIndex(0);
    setIsOpen(true);
  };

  const customStoryStyles = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  return (
    <div className={styles.stories_wrapper}>
      {isLoadingStories ? (
        <h1 className={styles.loading}>Загрузка сторис...</h1>
      ) : isErrorStories ? (
        <h1 className={styles.error}>Ошибка загрузки</h1>
      ) : (
        <>
          <div className={styles.slider_container}>
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: `.${styles.prev_button}`,
                nextEl: `.${styles.next_button}`,
              }}
              spaceBetween={10}
              slidesPerView={1}
              loop={true}
              speed={500}
              breakpoints={{
                320: { slidesPerView: 2 },
                481: { slidesPerView: 3 },
                643: { slidesPerView: 4 },
                800: { slidesPerView: 5 },
                945: { slidesPerView: 6 },
                1153: { slidesPerView: 7 },
              }}
            >
              {storyGroups.map((group) => (
                <SwiperSlide
                  key={group.id}
                  className={styles.slide}
                  onClick={() => handleStoryClick(group)}
                >
                  <div className={styles.story_group_wrapper}>
                    <div className={styles.image_wrapper}>
                      <img
                        className={styles.image}
                        src={group.stories[0]?.image || "/default-image.jpg"}
                        alt={group.name || "Группа сторис"}
                      />
                    </div>
                    <div className={styles.group_title}>{group.name}</div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Кастомные кнопки */}
            <div className={styles.navigation_buttons}>
              <button className={styles.prev_button}>
                <ChevronLeft size={24} />
              </button>
              <button className={styles.next_button}>
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          {isOpen && currentStoryGroup && (
            <div className={styles.modal}>
              <div className={styles.stories_container}>
                <ReactStories
                  stories={currentStoryGroup.stories.map((story: any) => ({
                    url: story.image || "/default-image.jpg",
                    header: {
                      heading: currentStoryGroup.name || "Группа сторис",
                      subheading: "Просмотр истории",
                      profileImage: story.image || "/default-profile.jpg",
                    },
                  }))}
                  defaultInterval={2500}
                  currentIndex={currentIndex}
                  onAllStoriesEnd={() => setIsOpen(false)}
                  storyStyles={customStoryStyles}
                />
                <button
                  className={styles.close_button}
                  onClick={() => setIsOpen(false)}
                >
                  <X className={styles.close_button_icon} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
