'use client'
import React, { useEffect, useState, useRef, memo } from 'react'
import { getCourseThumbnailMediaDirectory } from '@services/media/media'
import { useOrg } from '@components/Contexts/OrgContext'
import { useTranslation } from 'react-i18next'

interface FixedActivitySecondaryBarProps {
  course: any
  currentActivityId: string
  orgslug: string
  activity: any
}

// Memoized course info component
const CourseInfo = memo(({ course, org }: { course: any, org: any }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-shrink">
      <img
        className="w-[35px] sm:w-[45px] h-[20px] sm:h-[26px] rounded-md object-cover flex-shrink-0"
        src={`${getCourseThumbnailMediaDirectory(
          org?.org_uuid,
          course.course_uuid,
          course.thumbnail_image
        )}`}
        alt=""
      />
      <div className="flex flex-col -space-y-0.5 min-w-0 hidden sm:block">
        <p className="text-sm font-medium text-gray-500">{t('courses.courses')}</p>
        <h1 className="font-semibold text-gray-900 text-base truncate">
          {course.name}
        </h1>
      </div>
    </div>
  );
});

CourseInfo.displayName = 'CourseInfo';

export default function FixedActivitySecondaryBar(props: FixedActivitySecondaryBarProps): React.ReactNode {
  const [isScrolled, setIsScrolled] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const mainActivityInfoRef = useRef<HTMLDivElement | null>(null);
  const org = useOrg() as any;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldShow(!entry.isIntersecting);
      },
      {
        threshold: [0, 0.1, 1],
        rootMargin: '-80px 0px 0px 0px'
      }
    );

    const mainActivityInfo = document.querySelector('.activity-info-section');
    if (mainActivityInfo) {
      mainActivityInfoRef.current = mainActivityInfo as HTMLDivElement;
      observer.observe(mainActivityInfo);
    }

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (mainActivityInfoRef.current) {
        observer.unobserve(mainActivityInfoRef.current);
      }
    };
  }, []);

  if (!shouldShow) return null;

  return (
    <div
      className={`fixed top-[60px] left-0 right-0 bg-white/90 backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-top ${
        isScrolled ? 'nice-shadow' : ''
      }`}
      style={{ zIndex: 'var(--z-drag-overlay)' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 py-2">
          <CourseInfo course={props.course} org={org} />
        </div>
      </div>
    </div>
  );
}
