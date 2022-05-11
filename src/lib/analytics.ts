import posthog from "posthog-js";

function initiatePostHog () {
    posthog.init(process.env.POSTHOG_ID as string, { api_host: 'https://app.posthog.com' });
    return;
}

function capturePostHogAnayltics ( analyticsTitle: string,
                                   analyticsProperty: string,
                                   analyticsValue: any
) {
    const analyticsObject: {[key: string]: string} = {};
    analyticsObject[analyticsProperty] = analyticsValue;

    posthog.capture(analyticsTitle, analyticsObject);

    return;
}

export {
    initiatePostHog,
    capturePostHogAnayltics
};