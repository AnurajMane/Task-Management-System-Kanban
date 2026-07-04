package com.anuraj.kanban.dashboard.dto;

public class DashboardStatsResponse {

    private int totalBoards;
    private int totalTasks;
    private int completedTasks;
    private int pendingTasks;

    public DashboardStatsResponse(
            int totalBoards,
            int totalTasks,
            int completedTasks,
            int pendingTasks
    ) {
        this.totalBoards = totalBoards;
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.pendingTasks = pendingTasks;
    }

    public int getTotalBoards() {
        return totalBoards;
    }

    public int getTotalTasks() {
        return totalTasks;
    }

    public int getCompletedTasks() {
        return completedTasks;
    }

    public int getPendingTasks() {
        return pendingTasks;
    }
}