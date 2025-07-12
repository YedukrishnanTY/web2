import React from 'react'
import FuzzyText from './Fuzzy';

function index() {
    return (
        <div className="flex  w-full items-center justify-center flex-col gap-16 p-4">
            <FuzzyText
                baseIntensity={0.2}
                hoverIntensity={0.5}
                enableHover={true}
            >
                404
            </FuzzyText >
            <FuzzyText
                baseIntensity={0.2}
                hoverIntensity={0.5}
                enableHover={true}
            >
                Not Found
            </FuzzyText>
        </div>
    )
}

export default index


