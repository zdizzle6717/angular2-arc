const checkAuthorization = (accessControl: string[], user: any, roleConfig: any) => {
    let userFlags: string = user.roleFlags || '0';
    let accessFlags = '0';
    accessControl.forEach((roleName) => {
        roleConfig.forEach((config: any) => {
            if (config.name === roleName) {
                accessFlags += config.roleFlags;
            }
        });
    });

    let hasFlags = (flags: any, mask: any) => {
        flags = parseInt(flags, 10);
        mask = parseInt(mask, 10);

        return (mask & flags) === mask;
    };

    let accessGranted = hasFlags(userFlags, accessFlags) && +userFlags !== 0;

    return accessGranted;
};

export default checkAuthorization;
