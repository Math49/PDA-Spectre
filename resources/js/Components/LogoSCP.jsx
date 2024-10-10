import React from 'react';

export default function LogoSCP({className}) {

    let style = className ? className + " rotating" : 'rotating';

    return (
        <img className={style} src="/images/icon/logo_scp_blanc.png" alt="Logo SCP"/>
    )
}

