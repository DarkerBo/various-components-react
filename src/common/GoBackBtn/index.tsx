import React, { useRef, useCallback, useEffect } from 'react';
import styles from './index.module.scss';

const GoBackBtn: React.FC = () => {

  const docStyle = document.documentElement.style;
  const goBackRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

    const goBackElement = goBackRef.current as HTMLDivElement;
    const boundingClientRect = goBackElement.getBoundingClientRect();

    const x = e.clientX - boundingClientRect.left;
    const y = e.clientY - boundingClientRect.top;
    
    const xc = boundingClientRect.width/2;
    const yc = boundingClientRect.height/2;
    
    const dx = x - xc;
    const dy = y - yc;
    
    docStyle.setProperty('--rx', `${ dy/-1 }deg`);
    docStyle.setProperty('--ry', `${ dx/10 }deg`);
  }, [docStyle]);

  const handleMouseLeave = useCallback(() => {
    docStyle.setProperty('--ty', '0');
    docStyle.setProperty('--rx', '0');
    docStyle.setProperty('--ry', '0');
  }, [docStyle]);

  const handleMouseDown = useCallback(() => {
    docStyle.setProperty('--tz', '-25px')
  }, [docStyle]);

  const handleBodyMouseUp = useCallback(() => {
    docStyle.setProperty('--tz', '-12px');
  }, [docStyle]);

  useEffect(() => {
    document.body.addEventListener('mouseup', handleBodyMouseUp);

    return () => {
      document.body.removeEventListener('mouseup', handleBodyMouseUp);
    }
  })

  return (
    <div 
      className={styles.shake} 
      data-title={'go back to main page'} 
      ref={goBackRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
    />
  )
}

export default GoBackBtn;