import React, { useState, useEffect, useRef } from "react";
import { Button } from 'antd';

const FileSearch = ({ title, onFileSearch }) => {
    const [inputActive, setInputActive] = useState(false); // 输入框状态
    const [value, setValue] = useState(''); // 输入框文案

    const node = useRef(null);

    const closeSearch = () => {
        setInputActive(false);
        setValue('');
    }

    useEffect(() => {
        const handleInputEvent = (event) => {
            if (!inputActive) return;
            const { keyCode } = event;
            if (keyCode === 13) {
                onFileSearch(value);
            } else if (keyCode === 27) {
                closeSearch();
            }
        }
        document.addEventListener('keyup', handleInputEvent);
        return () => {
            document.removeEventListener('keyup', handleInputEvent);
        }
    })

    useEffect(() => {
        if (inputActive) node.current.focus();
    }, [inputActive])

    return (
        <div className="">
            {!inputActive ?
                <div className="fx--between-center">
                    <span>{title}</span>
                    <Button
                        onClick={() => { setInputActive(true) }}
                    >
                        🔍
                    </Button>
                </div>
                :
                <div className="fx--between-center">
                    <input
                        value={value}
                        ref={node}
                        onChange={(e) => { setValue(e.target.value) }}
                    />
                    <Button
                        onClick={closeSearch}
                    >
                        关闭
                    </Button>
                </div>
            }

        </div>
    )
}

export default FileSearch;