import { Suspense, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Spinner,
    makeStyles,
    tokens,
} from '@fluentui/react-components';
import { Settings24Regular as SettingIcon } from '@fluentui/react-icons';
import { getNodeVersion } from '@/invoke_handler';

const useStackClassName = makeStyles({
    versionLabel: {
        marginRight: tokens.spacingHorizontalS,
    }
})

export default function Home() {
    const [version, setVersion] = useState<string>();
    const navigate = useNavigate();
    const classes = useStackClassName();

    useEffect(() => {
        (async () => {
            const version = (await getNodeVersion())?.version;
            version && setVersion(version);
        })();
    }, []);

    function handleJumpToSettingPage() {
        navigate('/settings')
    }
    
    return (
        <>
            <Link to={'/error'}>go to the error page</Link>
            <div>
                <span className={classes.versionLabel}>Current node version:</span>
                <Suspense fallback={<Spinner size="extra-tiny" />}>
                    <span>{version}</span>
                </Suspense>
            </div>
            <SettingIcon onClick={handleJumpToSettingPage} />
        </>
    );
}
