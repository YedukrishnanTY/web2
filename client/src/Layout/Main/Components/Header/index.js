import React from 'react'
import { palette } from '../../../../theme/pallettes'

function Header() {
    return (
        <div className='flex-gap16 p-4-8' style={{ background: palette?.side, color: '#fff' }}>
            Header
        </div>
    )
}

export default Header