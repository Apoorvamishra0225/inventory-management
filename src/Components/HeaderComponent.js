import React from 'react'

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className = "navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        <a href = "/" className = "navbar-brand">
                            Product Management System
                        </a>
                    </div>

                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent