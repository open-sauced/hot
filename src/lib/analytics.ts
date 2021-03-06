import posthog from "posthog-js";

function initiatePostHog () {
    posthog.init(import.meta.env.VITE_POSTHOG_ID as string, { api_host: 'https://app.posthog.com' });
    return;
}

function capturePostHogAnayltics ( analyticsTitle: string,
                                   analyticsProperty: string,
                                   analyticsValue: string
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