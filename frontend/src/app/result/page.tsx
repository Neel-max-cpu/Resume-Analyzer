'use client';
import SkillGapResult from '@/component/result/SkillGapResult';
import VerdictResult from '@/component/result/VerdictResult';
import { useSearchParams } from 'next/navigation';
import React from 'react'

const Result = () => {
    const searchParams = useSearchParams();
    const mode  = searchParams.get('mode');
  return (
        <>
            {mode==='skill-gap' 
                ? <SkillGapResult/>
                : <VerdictResult/>
            }
        </>
  )
}

export default Result