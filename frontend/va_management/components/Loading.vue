<template>
    <div>
        <!-- Main -->
        <div class="loader-circle-91">
            <div class="cr1">
                <div class="cr2">
                    <div class="cr3"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/* Style Loading */
.loader-circle-91 {
    position: relative;
    height: 70px;
    width: 70px;
    margin: 0 auto;
}

.loader-circle-91 .cr1 {
    width: 100%;
    height: 100%;
    border: 5px solid transparent;
    border-top-color: #010101;
    border-radius: 50%;
    animation: anm-loader-circle-91 2s infinite;
}

.loader-circle-91 .cr2 {
    width: 70%;
    height: 70%;
    border: 5px solid transparent;
    border-top-color: #1a1515;
    border-radius: 50%;
    margin: 10px auto;
    animation: anm-loader-circle-91 2s infinite;
}

.loader-circle-91 .cr3 {
    width: 30%;
    height: 30%;
    border: 5px solid transparent;
    border-top-color: #1f2821;
    border-radius: 50%;
    margin: 10px auto;
    animation: anm-loader-circle-91 1s infinite;
}

@keyframes anm-loader-circle-91 {
    0% {}

    100% {
        transform: rotate(360deg);
    }
}
</style>
